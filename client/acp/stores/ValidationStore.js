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
            clientIdDidValidate: Actions.clientIdDidValidate,
            validateClientId   : Actions.validateClientId
        });

        this.clientIdValidating = false;
        this.clientIdValidity = 0;
    }

    clientIdDidValidate(validation) {
        this.clientIdValidity = validation;
        this.clientIdValidating = false;
    }

    validateClientId(clientId) {
        this.clientIdValidating = true;
    }
}

export default alt.createStore(ValidationStore, 'ValidationStore');
