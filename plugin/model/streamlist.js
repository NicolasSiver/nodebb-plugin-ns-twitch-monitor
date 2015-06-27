/**
 * Created by Nicolas on 6/27/15.
 */
(function (StreamList) {
    'use strict';

    var EventEmitter = require('eventemitter3'),
        util         = require('util');

    function List(channels) {
        EventEmitter3.call(this);
        this.channels = channels;
    }

    util.inherits(List, EventEmitter);

    List.prototype.update = function (streams) {

    };

    StreamList.init = function (channels) {
        return new List(channels);
    };

})(module.exports);