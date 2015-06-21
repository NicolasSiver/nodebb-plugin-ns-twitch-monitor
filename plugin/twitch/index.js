/**
 * Created by Nicolas on 6/21/15.
 */
(function (Twitch) {
    'use strict';

    var api = require('./api');

    Twitch.api = api;

    Twitch.validateClientId = function (clienId, callback) {
        api.getGamesTop(1, 0, callback);
    };

})(module.exports);
