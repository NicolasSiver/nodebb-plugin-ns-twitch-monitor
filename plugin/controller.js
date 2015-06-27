/**
 * Created by Nicolas on 6/22/15.
 */
(function (Controller) {
    'use strict';

    var async         = require('async'),

        database      = require('./database'),
        settings      = require('./settings'),
        streamManager = require('./streammanager'),
        twitch        = require('./twitch');

    Controller.addChannel = function (channelName, callback) {
        async.waterfall([
            async.apply(twitch.api.getChannel, channelName),
            function (response, next) {
                if (response.statusCode === 200) {
                    database.createChannel({
                        mature      : response.body.mature,
                        display_name: response.body.display_name,
                        game        : response.body.game,
                        logo        : response.body.logo,
                        url         : response.body.url,
                        views       : response.body.views,
                        followers   : response.body.followers,
                        language    : response.body.language,
                        status      : response.body.status,
                        created_at  : response.body.created_at,
                        updated_at  : response.body.updated_at,
                        delay       : response.body.delay
                    }, next);
                } else {
                    next(new Error(response.body.message));
                }
            }
        ], callback);
    };

    Controller.getAllChannels = function (callback) {
        database.getChannels(callback);
    };

    Controller.removeChannel = function (cid, callback) {
        async.waterfall([
            async.apply(database.getChannel, cid),
            function (channel, next) {
                if (channel == null) {
                    return next(new Error('Something went wrong, can not delete channel'));
                }
                database.deleteChannel(cid, next);
            },
            function (next) {
                next(null, cid);
            }
        ], callback);
    };

    /**
     * Validates client id as requested by Twitch, and saves it, if everything is Ok
     * @param clientId twitch application client id
     * @param callback should carry boolean status
     */
    Controller.validateClientId = function (clientId, callback) {
        //Invalid: empty client id
        if (!clientId) {
            return callback(null, false);
        }

        async.waterfall([
            async.apply(twitch.api.getGamesTop, 1, 0, true),
            function (response, next) {
                if (response.statusCode === 200) {
                    settings.save({clientId: clientId}, function (error, settingsData) {
                        if (error) {
                            return callback(error);
                        }
                        next(null, true);
                    });
                } else {
                    //Something went wrong
                    next(null, false);
                }
            }
        ], callback);
    };

    Controller.start = function (callback) {
        //streamManager.initWidthDelay(4000, true, callback);
    };

})(module.exports);
