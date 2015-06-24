/**
 * Created by Nicolas on 6/21/15.
 */
import alt from '../alt';
import Actions from '../actions/Actions';
import Socket from 'socket';

class SettingsStore {
    constructor() {
        this.state = {};
    }
}

export default alt.createStore(SettingsStore, 'SettingsStore');
