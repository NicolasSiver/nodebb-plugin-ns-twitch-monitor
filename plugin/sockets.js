/**
 * Created by Nicolas on 6/21/15.
 */
(function (Module) {
    'use strict';

    var async     = require('async'),
        path      = require('path'),

        nodebb    = require('./nodebb'),
        sockets   = nodebb.pluginSockets,
        nconf     = nodebb.nconf,
        user      = nodebb.user,
        settings  = require('./settings'),
        constants = require('./constants');

    Module.init = function (callback) {
        sockets[constants.SOCKETS] = {};
        //Acknowledgements
        sockets[constants.SOCKETS].getSettings = Module.getSettings;
        sockets[constants.SOCKETS].saveSettings = Module.saveSettings;
        sockets[constants.SOCKETS].validateCliendId = Module.validateClientId;

        callback();
    };

    Module.getSettings = function (socket, payload, callback) {
        settings.get(callback);
    };

    Module.saveSettings = function (socket, payload, callback) {
        settings.save(payload.settings, callback);
    };

    Module.validateClientId = function (socket, payload, callback) {

    };

})(module.exports);
