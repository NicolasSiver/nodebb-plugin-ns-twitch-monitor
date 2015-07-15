/**
 * Created by Nicolas on 6/27/15.
 */
(function (StreamList) {
    'use strict';

    var _            = require('lodash'),
        EventEmitter = require('eventemitter3'),
        postal       = require('postal'),
        util         = require('util'),

        channelModel = require('./channel'),
        constants    = require('../constants'),
        logger       = require('../logger');

    StreamList.events = {
        STREAM_DID_CHANGE: 'streamDidChange'
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
        var channelName = streamData.channel.name;
        var result = _.omit(streamData, ['_links', 'channel']);
        result.channel = channelName;
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

    List.prototype.getChannels = function () {
        return this.channels;
    };

    List.prototype.getStreamList = function () {
        return this.streamsMap;
    };

    List.prototype.getPayloadList = function () {
        var payloadList = {};
        this.channels.forEach(function (channel, index) {
            if (channel.name in this.streamsMap) {
                payloadList[channel.name] = {
                    status : StreamList.status.UPDATE,
                    channel: channel,
                    index  : index,
                    stream : this.streamsMap[channel.name]
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

        if (index >= 0) {
            var channel = this.channels.splice(index, 1);
            var stream = this.deleteStream(channel);

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

    List.prototype.update = function (streams) {
        var streamsMap = {};
        streams.forEach(function (stream) {
            streamsMap[stream.channel.name] = stream;
        }, this);

        this.channels.forEach(function (channel, index) {
            var stream = streamsMap[channel.name];

            if (stream) {
                //Update channel data in memory
                channelModel.update(channel, stream.channel);
                //Persist updated channel
                postal.publish({
                    channel: constants.CHANNELS,
                    topic  : constants.CHANNEL_DID_UPDATE,
                    data   : {
                        id     : channel.cid,
                        payload: channelModel.update({}, stream.channel)
                    }
                });
            }

            this.updateStream(channel, stream, index);
        }, this);
    };

    List.prototype.updateStream = function (channel, streamData, index) {
        var previousState = this.streamsMap[channel.name];
        var newState = streamData;

        if (newState) {
            //Reduce object size
            newState = this.cleanStreamPayload(newState);
        }

        if (!previousState && newState) {
            this.addStream(channel, newState);
            logger.log('verbose', 'Channel %s goes online', channel.name);
            this.emit(StreamList.events.STREAM_DID_CHANGE, {
                status : StreamList.status.ONLINE,
                channel: channel,
                index  : index,
                stream : newState
            });
        } else if (previousState && !newState) {
            this.deleteStream(channel);
            logger.log('verbose', 'Channel %s goes offline', channel.name);
            this.emit(StreamList.events.STREAM_DID_CHANGE, {
                status : StreamList.status.OFFLINE,
                channel: channel,
                index  : index,
                stream : previousState
            });
        } else if (previousState && newState) {
            this.mergeStream(channel, newState);
            //logger.log('verbose', 'Channel %s is updated', channel.name);
            this.emit(StreamList.events.STREAM_DID_CHANGE, {
                status : StreamList.status.UPDATE,
                channel: channel,
                index  : index,
                stream : newState
            });
        } else {
            //Channel is offline still
        }
    };

    StreamList.create = function (channels) {
        return new List(channels);
    };

})(module.exports);
