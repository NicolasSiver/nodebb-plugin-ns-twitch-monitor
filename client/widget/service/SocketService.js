/**
 * Created by Nicolas on 6/28/15.
 */
import EventEmitter from 'eventemitter3';
import Socket from 'socket';

const CHANNELS = {
    STREAM_UPDATE: 'plugins.ns-twitch-monitor.streamUpdate'
};

export default class SocketService extends EventEmitter {
    constructor() {
        super();
        Socket.on(
            CHANNELS.STREAM_UPDATE,
            (payload) => {
                console.log(payload);
            }
        );
    }
}