/**
 * Created by Nicolas on 6/22/15.
 */
import alt from '../alt';
import Actions from '../actions/Actions';
import Socket from 'socket';
import App from 'app';
import SocketApi from '../models/SocketApi';
import findIndex from 'lodash/array/findIndex';

class ChannelsStore {
    constructor() {
        this.bindListeners({
            channelDidAdd    : Actions.channelDidAdd,
            channelDidRemove : Actions.channelDidRemove,
            channelsDidUpdate: Actions.channelsDidUpdate
        });

        this.channels = [];
    }

    channelDidAdd(item) {
        this.channels.push(item);
    }

    channelDidRemove(channelId) {
        let index = findIndex(this.channels, channel => {
           return channel.cid === channelId;
        });

        if(index >= 0){
            this.channels.splice(index, 1);
        }
    }

    channelsDidUpdate(items) {
        this.channels = items;
    }
}

export default alt.createStore(ChannelsStore, 'ChannelsStore');
