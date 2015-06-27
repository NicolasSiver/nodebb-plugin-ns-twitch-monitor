/**
 * Created by Nicolas on 6/27/15.
 */
(function (StreamManager) {
    'use strict';
    //Twitch API, Christopher Gamble: Current recommended practice is to poll the API to check if streams are online.

    var _          = require('lodash'),

        database   = require('./database'),
        logger     = require('./logger'),
        streamList = require('./model/streamlist'),
        twitch     = require('./twitch');

    var _active      = false,
        _autoStart   = false,
        _channels    = null,
        _delay       = 0,
        _deferUpdate = null,
        _streams     = null;

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

            _channels = channels;
            _streams = streamList.create(channels);

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
        _channels = null;
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

    /**
     * Start monitoring process
     * @param callback will return boolean status, true - if everything is ok
     */
    StreamManager.start = function (callback) {
        _autoStart = true;

        if (_channels && _channels.length >= 0) {
            logger.log('info', 'Start monitoring of channels, delay is %d ms', _delay);
            _active = true;
            _deferUpdate = deferNextUpdate(_delay);
        }
        callback();
    };

    function update() {
        logger.log('verbose', 'Update is triggered');
        fetchStreams(_channels);
    }


})(module.exports);
