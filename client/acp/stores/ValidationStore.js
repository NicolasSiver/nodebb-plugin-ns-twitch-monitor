/**
 * Created by Nicolas on 6/21/15.
 */
import alt from '../alt';
import Actions from '../actions/Actions';
import Socket from 'socket';
import App from 'app';
import SocketApi from '../models/SocketApi';
import Validation from '../models/Validation';

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
            SocketApi.VALIDATE_CLIENT_ID,
            {
                clientId: id
            },
            (error, status) => {
                if (error) {
                    return App.alertError(error.message);
                }

                this.setState({
                    clientIdValidity: (status) ? Validation.SUCCESS : Validation.FAILURE
                });
            }
        );
    }
}

export default alt.createStore(ValidationStore, 'ValidationStore');
