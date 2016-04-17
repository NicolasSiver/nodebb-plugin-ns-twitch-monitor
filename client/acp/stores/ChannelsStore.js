/**
 * Created by Nicolas on 6/22/15.
 */
import Actions from '../actions/Actions';
import alt from '../alt';
import findIndex from 'lodash/array/findIndex';

class ChannelsStore {
    constructor() {
        this.bindListeners({
            channelDidAdd    : Actions.channelDidAdd,
            channelDidRemove : Actions.channelDidRemove,
            channelsDidUpdate: Actions.channelsDidUpdate
        });

        this.channels = null;
    }

    channelDidAdd(item) {
        let update;
        this.createCollectionIfNeeded();
        update = this.channels.slice();
        update.push(item);
        this.channels = update;
    }

    channelDidRemove(channelId) {
        this.createCollectionIfNeeded();
        this.channels = this.channels.filter((channel) => {
            return channel.cid != channelId;
        });
    }

    channelsDidUpdate(items) {
        this.channels = items;
    }

    createCollectionIfNeeded() {
        if (!this.channels) {
            this.channels = [];
        }
    }
}

export default alt.createStore(ChannelsStore, 'ChannelsStore');
