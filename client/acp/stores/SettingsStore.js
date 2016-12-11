import Actions from '../actions/Actions';
import alt from '../alt';

class SettingsStore {
    constructor() {
        this.bindListeners({
            clientIdDidChange: Actions.clientIdDidChange,
            settingsDidUpdate: Actions.settingsDidUpdate
        });

        this.clientId = null;
        this.clientIdPersisted = false;
        this.updateDelay = NaN;
    }

    clientIdDidChange(id) {
        this.clientId = id;
        this.clientIdPersisted = false;
    }

    settingsDidUpdate(settingsData) {
        this.clientId = settingsData.clientId;
        this.updateDelay = settingsData.updateTime;
        this.clientIdPersisted = true;
    }
}

export default alt.createStore(SettingsStore, 'SettingsStore');
