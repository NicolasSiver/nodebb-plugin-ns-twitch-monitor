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
        sockets[constants.SOCKETS].getSettings = Module.getSettings;
        sockets[constants.SOCKETS].saveSettings = Module.saveSettings;
        sockets[constants.SOCKETS].validateClientId = Module.validateClientId;

        callback();
    };

    Module.channelAdd = function (socket, payload, callback) {
        controller.addChannel(payload.name, callback);
    };

    Module.getSettings = function (socket, payload, callback) {
        settings.get(callback);
    };

    Module.saveSettings = function (socket, payload, callback) {
        settings.save(payload.settings, callback);
    };

    Module.validateClientId = function (socket, payload, callback) {
        twitch.validateClientId(payload.clientId, callback);
    };

})(module.exports);
