/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';
import PlayerView from './PlayerView';

export default class BaseView {
    constructor(selector) {
        this.$container = $(selector);
        this.children = {};
    }

    add(channelName, streamPayload) {
        let player = new PlayerView(channelName, streamPayload);
        this.addChild(player);
    }

    addChild(widget) {
        this.children[widget.getName()] = widget;
        this.$container.append(widget.getView());
    }

    getStreamCount() {
        return Object.keys(this.children).length;
    }

    hasStream(channelName) {
        return !!this.children[channelName];
    }

    remove(channelName, streamPayload) {

    }

    update(channelName, streamPayload) {

    }
}