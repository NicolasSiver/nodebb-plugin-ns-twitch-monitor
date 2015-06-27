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

    var sockets = nodebb.pluginSockets,
        nconf   = nodebb.nconf,
        user    = nodebb.user;

    Sockets.init = function (callback) {
        sockets[constants.SOCKETS] = {};
        //Acknowledgements
        sockets[constants.SOCKETS].channelAdd = Sockets.channelAdd;
        sockets[constants.SOCKETS].channelsGet = Sockets.channelsGet;
        sockets[constants.SOCKETS].channelRemove = Sockets.channelRemove;
        sockets[constants.SOCKETS].settingsGet = Sockets.settingsGet;
        sockets[constants.SOCKETS].saveSettings = Sockets.saveSettings;
        sockets[constants.SOCKETS].clientIdValidate = Sockets.clientIdValidate;

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

    Sockets.clientIdValidate = function (socket, payload, callback) {
        controller.validateClientId(payload.clientId, callback);
    };

    Sockets.saveSettings = function (socket, payload, callback) {
        settings.save(payload.settings, callback);
    };

    Sockets.settingsGet = function (socket, payload, callback) {
        settings.get(callback);
    };

})(module.exports);
