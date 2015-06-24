/**
 * Created by Nicolas on 6/21/15.
 */
import alt from '../alt';

class Actions {
    /**
     * Add a new channel to the list, it will be validated on server
     * @param name
     * @returns {{name: *}}
     */
    addChannel(name) {
        this.dispatch(name);
    }

    /**
     * Check for Client ID validity, Twitch requirement to use client id for every API request
     * @param id
     * @returns {{id: *}}
     */
    validateClientId(id) {
        this.dispatch(id);
    }
}

export default alt.createActions(Actions);
