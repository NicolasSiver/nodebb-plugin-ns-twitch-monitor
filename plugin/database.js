/**
 * Created by Nicolas on 6/24/15.
 */
(function (Database) {
    'use strict';

    var async        = require('async'),
        objectAssign = require('object-assign'),

        nodebb       = require('./nodebb'),
        constants    = require('./constants');

    var db = nodebb.db;

    Database.createChannel = function (data, done) {
        async.waterfall([
            async.apply(db.incrObjectField, 'global', constants.GLOBAL_AWARD_COUNTER),
            function (id, next) {
                var createTime = Date.now();
                var additionalData = {
                    createtime: createTime
                };
                var channelData = objectAssign(data, additionalData);

                async.parallel([
                    async.apply(db.sortedSetAdd, constants.NAMESPACE + ':channel', createTime, id),
                    async.apply(db.setObject, constants.NAMESPACE + ':channel:' + id, channelData)
                ], function (error) {
                    if (error) {
                        return next(error);
                    }
                    next(null, channelData);
                });
            }
        ], done);
    };

})(module.exports);
