/**
 * Created by Nicolas on 6/21/15.
 */
(function (Settings) {
    'use strict';

    var objectAssign = require('object-assign'),

        meta         = require('./nodebb').meta,
        constants    = require('./constants');

    //Memory cache
    var settingsCache = null,
        defaults      = {
            updateTime: 30000
        };

    Settings.init = function (done) {
        meta.settings.get(constants.NAMESPACE, function (error, settings) {
            if (error) {
                return done(error);
            }
            settingsCache = objectAssign(defaults, settings);
            done(null);
        });
    };

    Settings.get = function (done) {
        return done(null, settingsCache);
    };

    Settings.save = function (settings, done) {
        settingsCache = objectAssign(settingsCache, settings);
        meta.settings.set(constants.NAMESPACE, settingsCache, function (error) {
            done(error, settingsCache);
        });
    };

})(module.exports);
