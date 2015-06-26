/**
 * Created by Nicolas on 6/21/15.
 */
import alt from '../alt';
import SocketService from '../service/SocketService';

class Actions {
    /**
     * Add a new channel to the list, it will be validated on server
     * @param name
     */
    addChannel(name) {
        this.dispatch(name);
        SocketService.addChannel(name);
    }

    /**
     * Event: Channel Item is added to the list
     * @param item Full Channel Item Object
     */
    channelDidAdd(item) {
        this.dispatch(item);
    }

    /**
     * Event from backend, that channel is removed successfully
     * @param channelId
     */
    channelDidRemove(channelId) {
        this.dispatch(channelId);
    }

    /**
     * Event: list of channels is available to use
     * @param channels
     */
    channelsDidUpdate(channels) {
        this.dispatch(channels);
    }

    /**
     * Remove channel form the list by id
     * @param channelId
     */
    channelWillRemove(channelId) {
        this.dispatch(channelId);
        SocketService.removeChannel(channelId);
    }

    /**
     * Get all channels from the server
     */
    getChannels() {
        this.dispatch();
        SocketService.getChannels();
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
