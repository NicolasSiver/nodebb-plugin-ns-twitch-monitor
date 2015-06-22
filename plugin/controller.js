/**
 * Created by Nicolas on 6/22/15.
 */
(function (Controller) {
    'use strict';

    var async  = require('async'),

        twitch = require('./twitch');

    Controller.addChannel = function (channelName, callback) {
        async.waterfall([
            async.apply(twitch.api.getChannel, channelName),
            function (response, next) {
                console.log(response);
            }
        ], function (error) {
            if (error) {
                return callback(error);
            }
            callback(null, {});
        });
    };

})(module.exports);
