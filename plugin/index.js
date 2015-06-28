/**
 * Created by Nicolas on 6/20/15.
 */
(function (Plugin) {
    'use strict';

    var async      = require('async'),
        fs         = require('fs'),
        path       = require('path'),

        constants  = require('./constants'),
        controller = require('./controller'),
        logger     = require('./logger'),
        settings   = require('./settings'),
        sockets    = require('./sockets');

    var app             = null,
        widgetTemplates = {},
        TEMPLATE_ADMIN  = 'admin/widgets/widget.tpl',
        TEMPLATE_WIDGET = 'widgets/twitch-monitor.tpl';

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
                    content    : widgetTemplates[TEMPLATE_ADMIN]
                });

                callback(null, widgets);
            },

            widgetRender: function (widget, callback) {
                var limit  = widget.data.numStreams || 3,
                    layout = widget.data.layoutDirection || 'vertical';

                callback(null, widgetTemplates[TEMPLATE_WIDGET]);
            }
        },
        statics: {
            appLoad: function (params, callback) {
                var router      = params.router,
                    middleware  = params.middleware,
                    controllers = params.controllers,
                    pluginUri   = '/admin/plugins/twitch-monitor',
                    apiUri      = '/api' + pluginUri,
                    templates   = [TEMPLATE_ADMIN, TEMPLATE_WIDGET];

                app = params.app;

                router.get(pluginUri, middleware.admin.buildHeader, renderAdminPage);
                router.get(apiUri, renderAdminPage);

                async.series([
                    async.apply(async.each, templates, loadTemplate),
                    async.apply(settings.init),
                    async.apply(sockets.init),
                    async.apply(controller.start)
                ], callback);
            }
        }
    };

    function loadTemplate(templatePath, done) {
        fs.readFile(path.resolve(__dirname, '../public/templates', templatePath), function (error, content) {
            if (error) {
                logger.log('error', 'Template Error has occurred, message: %s', error.message);
                return done(error);
            }
            widgetTemplates[templatePath] = content.toString();
            logger.log('verbose', 'Widget Template %s is loaded', templatePath);
            done(null);
        });
    }

    function renderAdminPage(req, res, next) {
        res.render(
            'admin/plugins/twitch-monitor', {}
        );
    }

})(module.exports);
