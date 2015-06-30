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

    var _delay       = 0,
        _deferUpdate = null,
        _streams     = null;

    StreamManager.addChannel = function (channel, callback) {
        if (!_streams) {
            return callback(new Error('Stream Manager is not initialised properly'));
        }
        _streams.addChannel(channel);
        callback(null, channel);
        start();
    };

    StreamManager.initWidthDelay = function (delay, callback) {
        _delay = delay;

        if (_deferUpdate) {
            logger.log('warn', 'Stream manager is active, reset to initial state');
            StreamManager.dispose();
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
            start(callback);
        });
    };

    function deferNextUpdate(delay) {
        logger.log('verbose', 'Next stream status update in %d ms', delay);
        return setTimeout(update, delay);
    }

    StreamManager.disposeAll = function () {
        logger.log('warn', 'Dispose Stream Manager');
        clearTimeout(_deferUpdate);
        _deferUpdate = null;
        if (_streams != null) {
            _streams.removeListener(streamList.events.STREAM_DID_CHANGE, streamDidUpdate);
        }
        _streams = null;
    };

    function fetchStreams(channels) {
        var channelNames = _.pluck(channels, 'name');
        twitch.api.getStreams(channelNames, function (error, response) {
            if (error) {
                //Fail silently, don't rewrite previous stream status
                logger.log('error', 'Error has occurred, message: %s', error.message);
                _deferUpdate = deferNextUpdate(_delay);
            } else {
                if (_streams) {
                    _streams.update(response.body.streams);
                    _deferUpdate = deferNextUpdate(_delay);
                }
            }
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
        stop();
    };

    /**
     * Start monitoring process
     * @param callback will return boolean status, true - if everything is ok
     */
    function start(callback) {
        callback = callback || _.noop;

        if (_deferUpdate) {
            //Ignore several starts
            return callback();
        }

        if (_streams && _streams.getChannels().length > 0) {
            logger.log('info', 'Start monitoring of channels, delay is %d ms', _delay);
            _deferUpdate = deferNextUpdate(_delay);
        }

        callback();
    }

    function stop(callback) {
        callback = callback || _.noop;

        //Only stop, when there are not streams
        if (_streams && _streams.getChannels().length == 0) {
            logger.log('info', 'Stop monitoring, no more channels to check');
            clearTimeout(_deferUpdate);
            _deferUpdate = null;
        }

        callback();
    }

    function streamDidUpdate(event) {
        sockets.emit('streamUpdate', event);
    }

    function update() {
        logger.log('verbose', 'Update is triggered');
        fetchStreams(_streams.getChannels());
    }


})(module.exports);
