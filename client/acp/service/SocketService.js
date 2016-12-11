/**
 * Created by Nicolas on 6/24/15.
 */
import Actions from '../actions/Actions';
import App from 'app';
import {SETTINGS} from '../models/Sections';
import Socket from 'socket';
import SocketApi from '../models/SocketApi';
import Validation from '../models/Validation';

export default class SocketService {
    static addChannel(name) {
        Socket.emit(
            SocketApi.ADD_CHANNEL,
            {
                name: name
            },
            (error, channelItem) => {
                if (error) {
                    Actions.setSection(SETTINGS);
                    return App.alertError(error.message);
                }

                Actions.channelDidAdd(channelItem);
            }
        );
    }

    static getChannels() {
        Socket.emit(
            SocketApi.GET_CHANNELS,
            {},
            (error, items) => {
                if (error) {
                    return App.alertError(error.message);
                }

                Actions.channelsDidUpdate(items);
            }
        );
    }

    static getSettings() {
        Socket.emit(
            SocketApi.GET_SETTINGS,
            {},
            (error, settings) => {
                if (error) {
                    return App.alertError(error.message);
                }

                Actions.settingsDidUpdate(settings);
            }
        );
    }

    static getStreams() {
        Socket.emit(
            SocketApi.GET_STREAMS,
            {},
            (error, streams) => {
                if (error) {
                    return App.alertError(error.message);
                }

                Actions.streamListDidUpdate(streams);
            }
        );
    }

    static listenForUpdates() {
        Socket.on(
            SocketApi.STREAM_UPDATE,
            (payload) => {
                Actions.streamDidUpdate(payload);
            }
        );
    }

    static removeChannel(id) {
        Socket.emit(
            SocketApi.REMOVE_CHANNEL,
            {
                cid: id
            },
            (error, channelId) => {
                if (error) {
                    return App.alertError(error.message);
                }

                Actions.channelDidRemove(channelId);
            }
        );
    }

    static saveClientId(id) {
        Socket.emit(
            SocketApi.SAVE_CLIENT_ID,
            {
                clientId: id
            },
            error => {
                if (error) {
                    return App.alertError(error.message);
                }

                Actions.getSettings();
            }
        );
    }

    static validateClientId(id) {
        Socket.emit(
            SocketApi.VALIDATE_CLIENT_ID,
            {
                clientId: id
            },
            (error, status) => {
                if (error) {
                    return App.alertError(error.message);
                }

                Actions.clientIdDidValidate((status) ? Validation.SUCCESS : Validation.FAILURE);
                Actions.getSettings();
            }
        );
    }
}