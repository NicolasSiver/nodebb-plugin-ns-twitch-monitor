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
        this.socketService.on(Event.STREAM_LIST_DID_UPDATE, this.streamListDidUpdate.bind(this));
    }

    disposeIfNeeded() {
        if (this.viewController) {
            console.warn('Twitch Monitor is disposed');
            this.viewController.dispose();
            this.viewController = null;
        }
    }

    init(limit, layoutDirection, containerSelector) {
        console.warn("Created Twitch Monitor");
        this.disposeIfNeeded();
        this.viewController = new ViewController(new FlexLayout(layoutDirection, containerSelector), limit);

        //Populate view from cache
        let cachedStreams = this.socketService.getCachedStreams();
        for (let channelName in cachedStreams) {
            this.streamDidUpdate(cachedStreams[channelName]);
        }
    }

    streamDidUpdate(streamPayload) {
        // Prevent calls in ACP
        if(this.viewController){
            this.viewController.updateStream(streamPayload);
        }
    }

    streamListDidUpdate(list) {
        for (let channelName in list) {
            if (list.hasOwnProperty(channelName)) {
                this.streamDidUpdate(list[channelName]);
            }
        }
    }
}
