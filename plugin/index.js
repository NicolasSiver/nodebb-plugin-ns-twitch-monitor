/**
 * Created by Nicolas on 6/20/15.
 */
(function (Plugin) {
    'use strict';

    var async      = require('async'),
        fs         = require('fs'),

        constants  = require('./constants'),
        controller = require('./controller'),
        logger     = require('./logger'),
        settings   = require('./settings'),
        sockets    = require('./sockets');

    var widgetTemplate = null;

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
            },

            widgetsGet: function (widgets, callback) {
                widgets.push({
                    name       : 'Twitch Monitor',
                    widget     : constants.WIDGET,
                    description: 'Renders online Twitch streams in real time',
                    content    : widgetTemplate
                });

                callback(null, widgets);
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
                    function (next) {
                        fs.readFile(path.resolve(__dirname, '../public', 'templates/admin/widgets', 'widget.tpl'), function (error, content) {
                            if (error) {
                                logger.log('error', 'Template Error has occurred, message: %s', error.message);
                                return next(error);
                            }
                            widgetTemplate = content.toString();
                            logger.log('verbose', 'Widget Template is loaded');
                            next(null);
                        });
                    },
                    async.apply(settings.init),
                    async.apply(sockets.init),
                    async.apply(controller.start)
                ], callback);
            }
        }
    };

})(module.exports);
