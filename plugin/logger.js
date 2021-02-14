/**
 * Created by Nicolas on 6/27/15.
 */
(function (Module) {
    'use strict';

    var winston = require('winston');

    Module.exports = winston.createLogger({
        transports: [
            new (winston.transports.Console)({
                colorize : true,
                timestamp: function () {
                    var date = new Date();
                    return date.getDate() + '/' + (date.getMonth() + 1) + ' ' + date.toTimeString().substr(0, 5) + ' [' + global.process.pid + ']';
                },
                level    : global.env === 'production' ? 'info' : 'verbose',
                label    : 'plugins/twitch-monitor'
            })
        ]
    });

})(module);
