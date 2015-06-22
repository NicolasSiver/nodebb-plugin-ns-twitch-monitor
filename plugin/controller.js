/**
 * Created by Nicolas on 6/22/15.
 */
(function (Controller) {
    'use strict';

    var async    = require('async'),

        settings = require('./settings'),
        twitch   = require('./twitch');

    Controller.addChannel = function (channelName, callback) {
        async.waterfall([
            async.apply(twitch.api.getChannel, channelName),
            function (response, next) {
                if(response.statusCode === 200){
                    //FIXME Create Channel Entity
                }else{
                    next(new Error(response.body.message));
                }
            }
        ], function (error, channelItem) {
            if (error) {
                return callback(error);
            }
            callback(null, channelItem);
        });
    };

    /**
     * Validates client id as requested by Twitch, and saves it, if everything is Ok
     * @param clientId twitch application client id
     * @param callback should carry boolean status
     */
    Controller.validateClientId = function (clientId, callback) {
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
        ], function (error, result) {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    };

})(module.exports);
