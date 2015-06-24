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
            addChannel: Actions.addChannel
        });

        this.state = {
            channels: []
        };
    }

    addChannel(name) {
        console.log('add channel', name);
        Socket.emit(
            SocketApi.ADD_CHANNEL,
            {
                name: name
            },
            (error, channelItem) => {
                if (error) {
                    return App.alertError(error.message);
                }
                console.log('add channel item', channelItem);
                this.setState({
                    channels: this.state.channels.concat(channelItem)
                });
            }
        );
    }
}

export default alt.createStore(ChannelsStore, 'ChannelsStore');