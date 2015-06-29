/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';
import Event from '../events/Event';
import FlexLayout from '../view/FlexLayout';
import SocketService from '../service/SocketService';
import ViewController from '../controller/ViewController';

export default class TwitchMonitor {
    constructor() {
        this.socketService = new SocketService();
        this.socketService.on(Event.STREAM_DID_UPDATE, this.streamDidUpdate.bind(this));
    }

    disposeIfNeeded() {
        if (this.viewController) {
            console.warn('Twitch Monitor is disposed');
            this.viewController.dispose();
            this.viewController = null;
        }
    }

    init(limit, layoutDirection, containerSelector) {
        this.disposeIfNeeded();
        this.viewController = new ViewController(new FlexLayout(layoutDirection, containerSelector), limit);

        //Populate view from cache
        for (let streamPayload of this.socketService.getCachedStreams()) {
            this.streamDidUpdate(streamPayload);
        }
    }

    streamDidUpdate(streamPayload) {
        this.viewController.updateStream(streamPayload);
    }
}