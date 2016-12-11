import Actions from '../actions/Actions';
import alt from '../alt';

class SettingsStore {
    constructor() {
        this.bindListeners({
            clientIdDidChange: Actions.clientIdDidChange,
            settingsDidUpdate: Actions.settingsDidUpdate
        });

        this.clientId = null;
        this.clientIdPersisted = true;
        this.data = {};
    }

    clientIdDidChange(id) {
        this.clientId = id;
        this.clientIdPersisted = false;
    }

    settingsDidUpdate(settingsData) {
        this.data = settingsData;
    }
}

export default alt.createStore(SettingsStore, 'SettingsStore');
