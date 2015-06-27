/**
 * Created by Nicolas on 6/20/15.
 */
(function (Plugin) {
    'use strict';

    var async      = require('async'),

        controller = require('./controller'),
        settings   = require('./settings'),
        sockets    = require('./sockets');

    function renderAdminPage(req, res, next) {
        res.render(
            'admin/plugins/twitch-monitor', {}
        );
    }

    Plugin.hooks = {
        filters: {
            adminHeaderBuild: function (header, callback) {
                header.plugins.push({
                    route: '/plugins/twitch-monitor',
                    icon : 'fa-twitch',
                    name : 'Twitch Monitor'
                });
                callback(null, header);
            }
        },
        statics: {
            appLoad: function (params, callback) {
                var router      = params.router,
                    middleware  = params.middleware,
                    controllers = params.controllers,
                    pluginUri   = '/admin/plugins/twitch-monitor',
                    apiUri      = '/api' + pluginUri;

                router.get(pluginUri, middleware.admin.buildHeader, renderAdminPage);
                router.get(apiUri, renderAdminPage);

                async.series([
                    async.apply(settings.init),
                    async.apply(sockets.init),
                    async.apply(controller.start)
                ], callback);
            }
        }
    };

})(module.exports);
