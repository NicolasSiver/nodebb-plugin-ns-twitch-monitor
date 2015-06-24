/**
 * Created by Nicolas on 6/21/15.
 */
import alt from '../alt';

class Actions {
    /**
     * Add a new channel to the list, it will be validated on server
     * @param name
     */
    addChannel(name) {
        this.dispatch(name);
    }

    /**
     * Get all channels from the server
     */
    getChannels(){
        this.dispatch();
    }

    /**
     * Check for Client ID validity, Twitch requirement to use client id for every API request
     * @param id
     */
    validateClientId(id) {
        this.dispatch(id);
    }
}

export default alt.createActions(Actions);
