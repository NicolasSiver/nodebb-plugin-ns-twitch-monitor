/**
 * Created by Nicolas on 6/27/15.
 */
(function (StreamManager) {
    'use strict';
    // Twitch API, Christopher Gamble:
    // Current recommended practice is to poll the API to check if streams are online.

    var _          = require('lodash'),

        database   = require('./database'),
        logger     = require('./logger'),
        sockets    = require('./sockets'),
        streamList = require('./model/streamlist'),
        twitch     = require('./twitch');

    var _active      = false,
        _autoStart   = false,
        _delay       = 0,
        _deferUpdate = null,
        _streams     = null;

    StreamManager.addChannel = function (channel, callback) {
        if (!_streams) {
            return callback(new Error('Stream Manager is not initialised properly'));
        }
        _streams.addChannel(channel);
        callback(null, channel);
    };

    StreamManager.initWidthDelay = function (delay, autoStart, callback) {
        _autoStart = autoStart;
        _delay = delay;

        if (_active || _deferUpdate) {
            logger.log('warn', 'Stream manager is active, reset to initial state');
            dispose();
        }

        if (delay <= 1000) {
            return callback(new Error('Poll time should be higher than 1 second'));
        }

        database.getChannels(function (error, channels) {
            if (error) {
                return callback(error);
            }

            _streams = streamList.create(channels);
            _streams.on(streamList.events.STREAM_DID_CHANGE, streamDidUpdate);

            if (autoStart) {
                StreamManager.start(callback);
            } else {
                callback();
            }
        });
    };

    function deferNextUpdate(delay) {
        logger.log('verbose', 'Next stream status update in %d ms', delay);
        return setTimeout(update, delay);
    }

    function dispose() {
        logger.log('warn', 'Dispose Stream Manager');
        _active = false;
        clearTimeout(_deferUpdate);
        _deferUpdate = null;
        if (_streams != null) {
            _streams.removeListener(streamList.events.STREAM_DID_CHANGE, streamDidUpdate);
        }
        _streams = null;
    }

    function fetchStreams(channels) {
        var channelNames = _.pluck(channels, 'name');
        twitch.api.getStreams(channelNames, function (error, response) {
            if (error) {
                //Fail silently, don't rewrite previous stream status
                logger.log('error', 'Error has occurred, message: %s', error.message);
            } else {
                _streams.update(response.body.streams);
            }
            _deferUpdate = deferNextUpdate(_delay);
        });
    }

    StreamManager.getStreams = function (isPayload, callback) {
        if (_streams != null) {
            return callback(null, (isPayload) ? _streams.getPayloadList() : _streams.getStreamList());
        }
        callback(null, {});
    };

    StreamManager.removeChannelByName = function (name, callback) {
        if (!_streams) {
            return callback(new Error('Stream Manager is not initialised properly'));
        }
        _streams.removeChannel(name);
        callback(null);
    };

    /**
     * Start monitoring process
     * @param callback will return boolean status, true - if everything is ok
     */
    StreamManager.start = function (callback) {
        _autoStart = true;

        if (_streams && _streams.getChannels().length >= 0) {
            logger.log('info', 'Start monitoring of channels, delay is %d ms', _delay);
            _active = true;
            _deferUpdate = deferNextUpdate(_delay);
        }
        callback();
    };

    function streamDidUpdate(event) {
        sockets.emit('streamUpdate', event);
    }

    function update() {
        logger.log('verbose', 'Update is triggered');
        fetchStreams(_streams.getChannels());
    }


})(module.exports);
