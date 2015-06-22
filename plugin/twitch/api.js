/**
 * Created by Nicolas on 6/21/15.
 */
(function (Api) {
    'use strict';

    var _        = require('lodash'),
        async    = require('async'),
        request  = require('request'),

        settings = require('../settings');

    var baseUrl     = 'https://api.twitch.tv/kraken',
        apiVersion3 = 'application/vnd.twitchtv.v3+json';

    function createRequest(path, query, callback) {
        async.waterfall([
            async.apply(settings.get),
            function (settingsData, next) {
                if (_.isEmpty(settingsData.clientId)) {
                    return next(new Error('Client ID is empty'));
                }

                next(null, {
                    url    : [baseUrl, path].join('/'),
                    method : 'GET',
                    qs     : query,
                    json   : true,
                    headers: {
                        'Accept'   : apiVersion3,
                        'Client-ID': settingsData.clientId
                    }
                });
            },
            function (options, next) {
                request(options, function (error, response, body) {
                    if (error) {
                        return next(error);
                    }
                    next(null, {statusCode: response.statusCode, body: body});
                });
            }
        ], function (error, response) {
            if (error) {
                return callback(error);
            }
            callback(null, response);
        });
    }

    Api.getGamesTop = function (limit, offset, callback) {
        limit = limit || 1;
        offset = offset || 0;

        createRequest('games/top', {limit: limit, offset: offset}, callback);
    };

    Api.getChannel = function (channelName, callback) {
        createRequest('channels/' + channelName, null, callback);
    };

})(module.exports);
