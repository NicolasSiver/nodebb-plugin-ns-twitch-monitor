/**
 * Created by Nicolas on 7/14/15.
 */
(function (Channel) {
    'use strict';

    var objectAssign = require('object-assign');

    Channel.update = function (channel, data) {
        return objectAssign(channel, {
            mature      : data.mature,
            display_name: data.display_name,
            name        : data.name,
            game        : data.game,
            logo        : data.logo,
            url         : data.url,
            views       : data.views,
            followers   : data.followers,
            language    : data.language,
            status      : data.status,
            created_at  : data.created_at,
            updated_at  : data.updated_at,
            delay       : data.delay
        });
    };

})(module.exports);
