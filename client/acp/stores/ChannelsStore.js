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
            addChannel       : Actions.addChannel,
            channelsDidUpdate: Actions.channelsDidUpdate
        });

        this.channels = [];
    }

    addChannel(name) {
        Socket.emit(
            SocketApi.ADD_CHANNEL,
            {
                name: name
            },
            (error, channelItem) => {
                if (error) {
                    return App.alertError(error.message);
                }

                this.channels.push(channelItem);
            }
        );
    }

    channelsDidUpdate(items) {
        this.channels = items;
    }
}

export default alt.createStore(ChannelsStore, 'ChannelsStore');
