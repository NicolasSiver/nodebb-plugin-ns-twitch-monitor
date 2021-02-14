/**
 * Created by Nicolas on 6/21/15.
 */
(function (Sockets) {
    'use strict';

    var async      = require('async'),
        path       = require('path'),

        constants  = require('./constants'),
        controller = require('./controller'),
        nodebb     = require('./nodebb'),
        settings   = require('./settings'),
        twitch     = require('./twitch');

    var sockets       = nodebb.pluginSockets,
        serverSockets = nodebb.serverSockets,
        nconf         = nodebb.nconf,
        user          = nodebb.user;

    Sockets.init = function (callback) {
        sockets[constants.SOCKETS] = {};
        //Acknowledgements
        sockets[constants.SOCKETS].channelAdd = Sockets.channelAdd;
        sockets[constants.SOCKETS].channelsGet = Sockets.channelsGet;
        sockets[constants.SOCKETS].channelRemove = Sockets.channelRemove;
        sockets[constants.SOCKETS].clientIdSave = Sockets.clientIdSave;
        sockets[constants.SOCKETS].clientIdValidate = Sockets.clientIdValidate;
        sockets[constants.SOCKETS].settingsGet = Sockets.settingsGet;
        sockets[constants.SOCKETS].saveSettings = Sockets.saveSettings;
        sockets[constants.SOCKETS].streamsGet = Sockets.streamsGet;
        sockets[constants.SOCKETS].streamPayloadsGet = Sockets.streamPayloadsGet;

        callback();
    };

    Sockets.channelAdd = function (socket, payload, callback) {
        controller.addChannel(payload.name, callback);
    };

    Sockets.channelsGet = function (socket, payload, callback) {
        controller.getAllChannels(callback);
    };

    Sockets.channelRemove = function (socket, payload, callback) {
        controller.removeChannel(payload.cid, callback);
    };

    Sockets.clientIdSave = function (socket, payload, callback) {
        controller.saveClientId(payload.clientId, callback);
    };

    Sockets.clientIdValidate = function (socket, payload, callback) {
        controller.validateClientId(payload.clientId, callback);
    };

    Sockets.emit = function (eventName, payload) {
        serverSockets.emit('plugins.' + constants.SOCKETS + '.' + eventName, payload);
    };

    Sockets.saveSettings = function (socket, payload, callback) {
        settings.save(payload.settings, callback);
    };

    Sockets.settingsGet = function (socket, payload, callback) {
        settings.get(callback);
    };

    Sockets.streamsGet = function (socket, payload, callback) {
        controller.getAllStreams(callback);
    };

    Sockets.streamPayloadsGet = function (socket, payload, callback) {
        controller.getAllStreamsWithPayload(callback);
    };

})(module.exports);
