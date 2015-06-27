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
                    cid       : id,
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

    Database.deleteChannel = function (cid, done) {
        async.parallel([
            async.apply(db.delete, constants.NAMESPACE + ':channel:' + cid),
            async.apply(db.sortedSetRemove, constants.NAMESPACE + ':channel', cid)
        ], function (error) {
            if (error) {
                return done(error);
            }
            //Filter null responses from DB delete methods
            done(null);
        });
    };

    Database.getChannel = function (cid, done) {
        db.getObject(constants.NAMESPACE + ':channel:' + cid, done);
    };

    Database.getChannels = function (done) {
        async.waterfall([
            async.apply(db.getSortedSetRange, constants.NAMESPACE + ':channel', 0, -1),
            function (ids, next) {
                if (!ids.length) {
                    return next(null, ids);
                }
                db.getObjects(ids.map(function (id) {
                    return constants.NAMESPACE + ':channel:' + id;
                }), next);
            }
        ], done);
    };

})(module.exports);
