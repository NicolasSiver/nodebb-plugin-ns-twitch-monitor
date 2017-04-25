/**
 * Created by Nicolas on 6/21/15.
 */
(function (Api) {
    'use strict';

    var _            = require('lodash'),
        async        = require('async'),
        objectAssign = require('object-assign'),
        request      = require('request'),

        settings     = require('../settings');

    var baseUrl     = 'https://api.twitch.tv/kraken',
        apiVersion3 = 'application/vnd.twitchtv.v3+json';

    function createRequest(data, callback) {
        var path  = data.path,
            query = data.query,
            force = data.force;

        async.waterfall([
            async.apply(settings.get),
            function (settingsData, next) {
                if (_.isEmpty(settingsData.clientId) && !force) {
                    return next(new Error('Client ID is empty'));
                }

                next(null, {
                    url    : [baseUrl, path].join('/'),
                    method : 'GET',
                    qs     : query,
                    json   : true,
                    headers: {
                        'Accept'   : apiVersion3,
                        'Client-ID': data.clientId || settingsData.clientId
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

    Api.getChannel = function (channelName, callback) {
        async.waterfall([
            async.apply(createRequest, {
                path : 'channels/' + channelName,
                force: false
            }),
            function (response, next) {
                return next(null, transform(response, transformEntity));
            }
        ], callback);
    };

    Api.getStreams = function (channels, callback) {
        async.waterfall([
            async.apply(createRequest, {
                path : 'streams',
                query: {channel: channels.join(','), limit: 100},
                force: false
            }),
            function (response, next) {
                return next(null, transform(response, function (payload) {
                    var streams = [], stream;
                    if(_.isObject(payload) && _.isArray(payload.streams)) {
                        payload.streams.forEach(function (payloadStream) {
                            stream = transformEntity(payloadStream);
                            stream.channel = transformEntity(payloadStream.channel);
                            streams.push(stream);
                        });
                    }
                    return streams;
                }))
            }
        ], callback);
    };

    Api.validateClientId = function (clientId, callback) {
        createRequest({
            path    : '',
            clientId: clientId,
            force   : true
        }, callback);
    };

    function transform(incomingMessage, implementation) {
        var result = {
            statusCode: incomingMessage.statusCode,
            data      : {}
        };

        // Apply transformation only if OK response
        if (incomingMessage.statusCode === 200) {
            result.data = implementation(incomingMessage.body);
        }

        return result;
    }

    function transformEntity(data) {
        return objectAssign({}, {'twitch_id': data['_id']}, _.omit(data, ['_id', '_links']));
    }

})(module.exports);
