/**
 * Created by Nicolas on 6/24/15.
 */
import Actions from '../actions/Actions';
import App from 'app';
import Socket from 'socket';
import SocketApi from '../models/SocketApi';

export default class SocketService {
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
}