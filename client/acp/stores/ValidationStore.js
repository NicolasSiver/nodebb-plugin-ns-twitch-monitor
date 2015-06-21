/**
 * Created by Nicolas on 6/21/15.
 */
import Reflux from 'reflux';
import {Actions} from '../actions/Actions';
import Socket from 'socket';

export var ValidationStore = Reflux.createStore({
    init: function () {
        this.listenTo(Actions.validateClientId, this.validateClientId);
    },

    validateClientId: function (value) {
        console.log(value);
    }
});