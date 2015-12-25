import Actions from '../actions/Actions';
import alt from '../alt';
import * as Sections from '../models/Sections';

class NavigationStore {
    constructor() {
        this.bindListeners({
            sectionWillSet: Actions.setSection
        });

        this.currentSection = Sections.CHANNELS;
        this.sections = [
            {id: Sections.CHANNELS, icon: 'fa-twitch', label: 'Channels'},
            {id: Sections.SETTINGS, label: 'Settings'}
        ];
    }

    sectionWillSet(section) {
        this.currentSection = section;
    }
}

export default alt.createStore(NavigationStore, 'NavigationStore');
