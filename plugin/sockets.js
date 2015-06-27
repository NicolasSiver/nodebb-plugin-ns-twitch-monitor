/**
 * Created by Nicolas on 6/21/15.
 */
(function (Module) {
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

    Module.init = function (callback) {
        sockets[constants.SOCKETS] = {};
        //Acknowledgements
        sockets[constants.SOCKETS].channelAdd = Module.channelAdd;
        sockets[constants.SOCKETS].channelsGet = Module.channelsGet;
        sockets[constants.SOCKETS].channelRemove = Module.channelRemove;
        sockets[constants.SOCKETS].settingsGet = Module.settingsGet;
        sockets[constants.SOCKETS].saveSettings = Module.saveSettings;
        sockets[constants.SOCKETS].clientIdValidate = Module.clientIdValidate;

        callback();
    };

    Module.channelAdd = function (socket, payload, callback) {
        controller.addChannel(payload.name, callback);
    };

    Module.channelsGet = function (socket, payload, callback) {
        controller.getAllChannels(callback);
    };

    Module.channelRemove = function (socket, payload, callback) {
        controller.removeChannel(payload.cid, callback);
    };

    Module.clientIdValidate = function (socket, payload, callback) {
        controller.validateClientId(payload.clientId, callback);
    };

    Module.saveSettings = function (socket, payload, callback) {
        settings.save(payload.settings, callback);
    };

    Module.settingsGet = function (socket, payload, callback) {
        settings.get(callback);
    };

})(module.exports);
