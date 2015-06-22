/**
 * Created by Nicolas on 6/22/15.
 */
import Reflux from 'reflux';
import {Actions} from '../actions/Actions';
import Socket from 'socket';
import App from 'app';

const API = {
    ADD_CHANNEL: 'plugins.ns-twitch-monitor.channelAdd'
};

export var ChannelsStore = Reflux.createStore({
    init: function () {
        this.listenTo(Actions.addChannel, this.channelWillAdd);
        this.channels = [];
    },

    channelWillAdd: function (data) {
        Socket.emit(
            API.ADD_CHANNEL,
            {
                name: data
            },
            (error, channelItem) => {
                if (error) {
                    return App.alertError(error.message);
                }

                this.channels.push(channelItem);
                this.trigger(this.channels);
            }
        );
    }
});