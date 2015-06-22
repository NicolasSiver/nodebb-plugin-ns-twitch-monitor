/**
 * Created by Nicolas on 6/21/15.
 */
import Reflux from 'reflux';
import {Actions} from '../actions/Actions';
import Socket from 'socket';
import App from 'app';

const API = {
    //Validate and Save
    VALIDATE_CLIENT_ID: 'plugins.ns-twitch-monitor.validateClientId'
};

export const VALIDATION = {
    SUCCESS: 1,
    FAILURE: 2
};

export var ValidationStore = Reflux.createStore({
    init: function () {
        this.listenTo(Actions.validateClientId, this.validateClientId);
        this.validClientId = 0;
    },

    validateClientId: function (value) {
        Socket.emit(
            API.VALIDATE_CLIENT_ID,
            {
                clientId: value
            },
            (error, status) => {
                if (error) {
                    return App.alertError(error.message);
                }

                this.channels.push(channelItem);
                this.validClientId = (status) ? VALIDATION.SUCCESS : VALIDATION.FAILURE;
                this.trigger(this.validClientId);
            }
        );
    }
});