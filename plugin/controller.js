/**
 * Created by Nicolas on 6/22/15.
 */
(function (Controller) {
    'use strict';

    var async         = require('async'),
        postal        = require('postal'),

        constants     = require('./constants'),
        database      = require('./database'),
        logger        = require('./logger'),
        settings      = require('./settings'),
        streamManager = require('./streammanager'),
        twitch        = require('./twitch');

    var channelsSubscription = null;

    Controller.addChannel = function (channelName, callback) {
        async.waterfall([
            async.apply(twitch.api.getChannel, channelName),
            function (response, next) {
                response['data']['name'] = response['data']['id'];
                if (response.statusCode === 200) {
                    database.createChannel(response['data'], next);
                } else {
                    next(new Error(response.data.message));
                }
            },
            function (channel, next) {
                streamManager.addChannel(channel, next);
            }
        ], callback);
    };

    Controller.disposeIfNeeded = function () {
        if (channelsSubscription) {
            channelsSubscription.unsubscribe();
            channelsSubscription = null;
        }
        streamManager.disposeAll();
    };

    Controller.getAllChannels = function (callback) {
        database.getChannels(callback);
    };

    Controller.getAllStreams = function (callback) {
        streamManager.getStreams(false, callback);
    };

    Controller.getAllStreamsWithPayload = function (callback) {
        streamManager.getStreams(true, callback);
    };

    Controller.removeChannel = function (cid, callback) {
        var channelName = null;

        async.waterfall([
            async.apply(database.getChannel, cid),
            function (channel, next) {
                if (channel == null) {
                    return next(new Error('Something went wrong, can not delete channel'));
                }
                channelName = channel.name;
                database.deleteChannel(cid, next);
            },
            function (next) {
                streamManager.removeChannelByName(channelName, next);
            },
            function (next) {
                next(null, cid);
            }
        ], callback);
    };

    Controller.saveClientId = function (clientId, callback) {
        if (!clientId) {
            return callback(new Error('Client ID is empty.'));
        }

        settings.save({clientId: clientId}, function (error, settingsData) {
            if (error) {
                return callback(error);
            }
            callback(null);
        });
    };

    Controller.start = function (callback) {
        async.waterfall([
            function (next) {
                channelsSubscription = postal.subscribe({
                    channel : constants.CHANNELS,
                    topic   : constants.CHANNEL_DID_UPDATE,
                    callback: function (data) {
                        database.updateChannel(data.id, data.payload, function (error) {
                            if (error) {
                                return logger.log('error', 'Persisting channel. Error has occurred, message: %s', error.message);
                            }
                        });
                    }
                });
                next();
            },
            async.apply(settings.get),
            function (settingsData, next) {
                streamManager.initWidthDelay(settingsData.updateTime, next);
            }
        ], callback);
    };

    /**
     * Validates client id as requested by Twitch
     *
     * @param {string} clientId twitch application client id
     * @param {function} callback should carry boolean status
     */
    Controller.validateClientId = function (clientId, callback) {
        //Invalid: empty client id
        if (!clientId) {
            return callback(null, false);
        }

        async.waterfall([
            async.apply(twitch.api.validateClientId, clientId),
            function (response, next) {
                next(null, response.statusCode === 200 && response.body.identified === true);
            }
        ], callback);
    };

})(module.exports);
