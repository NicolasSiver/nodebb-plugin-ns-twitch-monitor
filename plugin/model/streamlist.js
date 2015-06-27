/**
 * Created by Nicolas on 6/27/15.
 */
(function (StreamList) {
    'use strict';

    var _            = require('lodash'),
        EventEmitter = require('eventemitter3'),
        util         = require('util'),

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
        this.channels = channels;
        this.channelsMap = {};
        this.streamsMap = {};

        channels.forEach(function (channel) {
            this.channelsMap[channel.name] = channel;
        }, this);
    }

    util.inherits(List, EventEmitter);

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
     * @param stream
     */
    List.prototype.deleteStream = function (channel, stream) {
        delete this.streamsMap[channel.name];
    };

    /**
     * Update stream with the latest data: number of viewers, etc.
     * @param channel
     * @param stream
     */
    List.prototype.mergeStream = function (channel, stream) {
        this.streamsMap[channel.name] = stream;
    };

    List.prototype.update = function (streams) {
        var streamsMap = {};
        streams.forEach(function (stream) {
            streamsMap[stream.channel.name] = stream;
        }, this);

        this.channels.forEach(function (channel, index) {
            this.updateStream(channel, streamsMap[channel.name], index);
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
            this.deleteStream(channel, previousState);
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