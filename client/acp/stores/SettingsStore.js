/**
 * Created by Nicolas on 6/21/15.
 */
import Actions from '../actions/Actions';
import alt from '../alt';

class SettingsStore {
    constructor() {
        this.bindListeners({
            settingsDidUpdate: Actions.settingsDidUpdate
        });

        this.settings = {};
    }

    settingsDidUpdate(settingsData) {
        this.settings = settingsData;
    }
}

export default alt.createStore(SettingsStore, 'SettingsStore');
