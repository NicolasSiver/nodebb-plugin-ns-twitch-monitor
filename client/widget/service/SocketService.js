/**
 * Created by Nicolas on 6/28/15.
 */
import Event from '../events/Event';
import EventEmitter from 'eventemitter3';
import Socket from 'socket';

const CHANNELS = {
    STREAM_UPDATE: 'plugins.ns-twitch-monitor.streamUpdate'
};

export default class SocketService extends EventEmitter {
    constructor() {
        super();
        this.subscribe();

    }

    subscribe() {
        Socket.on(
            CHANNELS.STREAM_UPDATE,
            (payload) => {
                this.emit(Event.STREAM_DID_UPDATE, payload);
            }
        );
    }
}