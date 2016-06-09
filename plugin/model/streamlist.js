/**
 * Created by Nicolas on 6/27/15.
 */
(function (StreamList) {
    'use strict';

    var _            = require('lodash'),
        clone        = require('clone'),
        EventEmitter = require('eventemitter3'),
        util         = require('util'),

        constants    = require('../constants'),
        logger       = require('../logger');

    var channelFields = [
        'mature', 'display_name', 'name', 'game', 'logo', 'url', 'views', 'followers',
        'language', 'status', 'created_at', 'updated_at', 'delay'
    ];

    StreamList.create = function (channels) {
        return new List(channels);
    };

    StreamList.events = {
        CHANNEL_DID_CHANGE: 'channelDidChange',
        STREAM_DID_CHANGE : 'streamDidChange'
    };

    StreamList.status = {
        ONLINE : 'online',
        OFFLINE: 'offline',
        UPDATE : 'update'
    };

    function List(channels) {
        EventEmitter.call(this);
        this.channels = channels || [];
        this.streamsMap = {};
    }

    util.inherits(List, EventEmitter);

    List.prototype.addChannel = function (channel) {
        logger.log('verbose', 'Register channel %s', channel.name);
        //Stream will be fetched with the next tick
        this.channels.push(channel);
    };

    /**
     * Stream goes Online.
     * @param channel
     * @param stream
     */
    List.prototype.addStream = function (channel, stream) {
        this.streamsMap[channel.name] = stream;
    };

    List.prototype.cleanStreamPayload = function (streamData) {
        var result, channelName;
        if (streamData) {
            channelName = streamData.channel.name;
            result = _.omit(streamData, ['_links', 'channel']);
            result.channel = channelName;
        }
        return result;
    };

    List.prototype.createChannel = function (data, fields) {
        var result = {}, len = fields.length, fieldName;
        for (var i = 0; i < len; ++i) {
            fieldName = fields[i];
            result[fieldName] = data[fieldName];
        }
        return result;
    };

    /**
     * Stream goes Offline
     * @param channel
     */
    List.prototype.deleteStream = function (channel) {
        var stream = this.streamsMap[channel.name];
        delete this.streamsMap[channel.name];
        return stream;
    };

    List.prototype.findChannelIndexById = function (id) {
        var i = 0, len = this.channels.length;
        for (i; i < len; ++i) {
            if (this.channels[i].cid === id) {
                return i;
            }
        }
        return -1;
    };

    List.prototype.getChannels = function () {
        return clone(this.channels);
    };

    List.prototype.getStreamList = function () {
        return clone(this.streamsMap);
    };

    List.prototype.getPayloadList = function () {
        var payloadList = {};
        this.channels.forEach(function (channel, index) {
            if (channel.name in this.streamsMap) {
                payloadList[channel.name] = {
                    status : StreamList.status.UPDATE,
                    channel: clone(channel),
                    index  : index,
                    stream : clone(this.streamsMap[channel.name])
                };
            }
        }, this);
        return payloadList;
    };

    /**
     * Update stream with the latest data: number of viewers, etc.
     * @param channel
     * @param stream
     */
    List.prototype.mergeStream = function (channel, stream) {
        this.streamsMap[channel.name] = stream;
    };

    List.prototype.removeChannel = function (channelName) {
        var index = _.findIndex(this.channels, function (channel) {
            return channel.name === channelName;
        });

        if (index != -1) {
            var channel = this.channels[index];
            var stream = this.deleteStream(channel);

            this.channels.splice(index, 1);

            if (stream) {
                //Force stream go to offline, reason: removed
                this.emit(StreamList.events.STREAM_DID_CHANGE, {
                    status : StreamList.status.OFFLINE,
                    channel: channel,
                    index  : index,
                    stream : stream
                });
            }
        }
    };

    List.prototype.setChannel = function (channel) {
        var index = this.findChannelIndexById(channel.cid);
        if (index != -1) {
            this.channels[index] = channel;
            this.emit(StreamList.events.CHANNEL_DID_CHANGE, {
                channel: clone(channel),
                index  : index
            });
        }
    };

    List.prototype.update = function (streams) {
        var channelStreams = {}, channelUpdates = [];
        streams.forEach(function (stream) {
            channelStreams[stream.channel.name] = stream;
        }, this);

        this.channels.forEach(function (channel, index) {
            var stream = channelStreams[channel.name];

            if (stream) {
                channelUpdates.push(clone(stream.channel));
            }

            this.updateStream(channel, this.cleanStreamPayload(stream), index);
        }, this);

        channelUpdates.forEach(function (channelPayload) {
            if (!channelPayload) {
                logger.log('error', 'Channel payload is empty');
            }
            this.setChannel(this.createChannel(channelPayload, channelFields));
        }, this);
    };

    List.prototype.updateStream = function (channel, streamData, index) {
        var previousState = this.streamsMap[channel.name];
        var newState = streamData;

        if (!previousState && newState) {
            this.addStream(channel, newState);
            logger.log('verbose', 'Channel %s goes online', channel.name);
            this.emit(StreamList.events.STREAM_DID_CHANGE, {
                status : StreamList.status.ONLINE,
                channel: clone(channel),
                index  : index,
                stream : clone(newState)
            });
        } else if (previousState && !newState) {
            this.deleteStream(channel);
            logger.log('verbose', 'Channel %s goes offline', channel.name);
            this.emit(StreamList.events.STREAM_DID_CHANGE, {
                status : StreamList.status.OFFLINE,
                channel: clone(channel),
                index  : index,
                stream : clone(previousState)
            });
        } else if (previousState && newState) {
            this.mergeStream(channel, newState);
            //logger.log('verbose', 'Channel %s is updated', channel.name);
            this.emit(StreamList.events.STREAM_DID_CHANGE, {
                status : StreamList.status.UPDATE,
                channel: clone(channel),
                index  : index,
                stream : clone(newState)
            });
        } else {
            //Channel is offline still
        }
    };

})(module.exports);
