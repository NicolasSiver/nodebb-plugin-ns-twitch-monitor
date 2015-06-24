/**
 * Created by Nicolas on 6/22/15.
 */
import alt from '../alt';
import Actions from '../actions/Actions';
import Socket from 'socket';
import App from 'app';
import SocketApi from '../models/SocketApi';

class ChannelsStore {
    constructor() {
        this.bindListeners({
            channelDidAdd    : Actions.channelDidAdd,
            channelsDidUpdate: Actions.channelsDidUpdate
        });

        this.channels = [];
    }

    channelDidAdd(item) {
        this.channels.push(item);
    }

    channelsDidUpdate(items) {
        this.channels = items;
    }
}

export default alt.createStore(ChannelsStore, 'ChannelsStore');
