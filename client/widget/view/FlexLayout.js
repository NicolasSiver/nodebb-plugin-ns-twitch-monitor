/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';
import PlayerView from './PlayerView';

export default class FlexLayout {
    constructor(direction, selector) {
        this.$root = $(selector);
        this.$container = $('<div></div>')
            .addClass('twitch-monitor-container')
            .addClass((direction === 'vertical') ? 'layout-vertical' : 'layout-row');

        this.$root.append(this.$container);

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
        if (this.hasStream(channelName)) {
            const widget = this.children[channelName];
            widget.getView().remove();
            delete this.children[channelName];
        }
    }

    update(channelName, streamPayload) {
        this.children[channelName].update(streamPayload);
    }
}