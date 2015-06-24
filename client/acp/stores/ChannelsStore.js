/**
 * Created by Nicolas on 6/22/15.
 */
import alt from '../alt';
import Actions from '../actions/Actions';
import Socket from 'socket';
import App from 'app';

const API = {
    ADD_CHANNEL: 'plugins.ns-twitch-monitor.channelAdd'
};

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
        Socket.emit(
            API.ADD_CHANNEL,
            {
                name: name
            },
            (error, channelItem) => {
                if (error) {
                    return App.alertError(error.message);
                }

                this.setState({
                    channels: this.state.channels.concat(channelItem)
                });
            }
        );
    }
}

export default alt.createStore(ChannelsStore, 'ChannelsStore');