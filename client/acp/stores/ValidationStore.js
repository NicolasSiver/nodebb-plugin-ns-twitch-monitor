/**
 * Created by Nicolas on 6/21/15.
 */
import alt from '../alt';
import Actions from '../actions/Actions';
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

class ValidationStore {
    constructor() {
        this.bindListeners({
            validateClientId: Actions.validateClientId
        });

        this.state = {
            clientIdValidity: 0
        };
    }

    validateClientId(id) {
        Socket.emit(
            API.VALIDATE_CLIENT_ID,
            {
                clientId: id
            },
            (error, status) => {
                if (error) {
                    return App.alertError(error.message);
                }

                this.setState({
                    clientIdValidity: (status) ? VALIDATION.SUCCESS : VALIDATION.FAILURE
                });
            }
        );
    }
}

export default alt.createStore(ValidationStore, 'ValidationStore');
