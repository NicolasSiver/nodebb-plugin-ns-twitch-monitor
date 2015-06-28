/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';
import Event from '../events/Event';
import HorizontalView from '../view/HorizontalView';
import SocketService from '../service/SocketService';
import VerticalView from '../view/VerticalView';
import ViewController from '../controller/ViewController';

export default class TwitchMonitor {
    constructor() {
        this.socketService = new SocketService();
        this.socketService.on(Event.STREAM_DID_UPDATE, this.streamDidUpdate.bind(this));
    }

    /**
     * Creates proper view for requested layout
     * @param layout
     * @param selector
     * @returns {BaseView}
     */
    createView(layout, selector) {
        let view = null;

        //TODO Support more types of layout?
        if (layout === 'vertical') {
            view = new VerticalView(selector);
        } else {
            view = new HorizontalView(selector);
        }

        return view;
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
        this.viewController = new ViewController(this.createView(layoutDirection, containerSelector), limit);
    }

    streamDidUpdate(streamPayload) {
        this.viewController.updateStream(streamPayload);
    }
}