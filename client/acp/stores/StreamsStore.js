/**
 * Created by Nicolas on 6/27/15.
 */
import Actions from '../actions/Actions';
import alt from '../alt';

class StreamsStore {
    constructor() {
        this.bindListeners({
            streamDidUpdate    : Actions.streamDidUpdate,
            streamListDidUpdate: Actions.streamListDidUpdate
        });

        this.streams = {};
    }

    streamDidUpdate(streamPayload) {
        if (streamPayload.status === 'offline') {
            delete this.streams[streamPayload.channel.name];
        } else {
            this.streams[streamPayload.channel.name] = streamPayload.stream;
        }
    }

    streamListDidUpdate(list) {
        this.streams = list;
    }
}

export default alt.createStore(StreamsStore, 'StreamsStore');