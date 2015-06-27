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
     * Event: result of client id validation, use Validation enum to find proper state
     * @param validation
     */
    clientIdDidValidate(validation) {
        this.dispatch(validation);
    }

    /**
     * Get all channels from the server
     */
    getChannels() {
        this.dispatch();
        SocketService.getChannels();
    }

    /**
     * Get current settings from the server
     */
    getSettings() {
        this.dispatch();
        SocketService.getSettings();
    }

    /**
     * Event: Latest Settings is available to use
     * @param settings
     */
    settingsDidUpdate(settings) {
        this.dispatch(settings);
    }

    /**
     * Event: One of the channel's streams have been updated
     * @param streamPayload
     */
    streamDidUpdate(streamPayload) {
        this.dispatch(streamPayload);
    }

    /**
     * Listen for stream updates via sockets
     */
    subscribe() {
        SocketService.listenForUpdates();
    }

    /**
     * Check for Client ID validity, Twitch requirement to use client id for every API request
     * @param id
     */
    validateClientId(id) {
        this.dispatch(id);
        SocketService.validateClientId(id);
    }
}

export default alt.createActions(Actions);
