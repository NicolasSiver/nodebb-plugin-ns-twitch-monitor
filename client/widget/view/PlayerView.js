/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';
import StreamPreviewView from './StreamPreviewView';

export default class PlayerView {
    constructor(name, streamPayload) {
        this.name = name;
        this.payload = streamPayload;
        this.$view = $('<div></div>').addClass('twitch-monitor-player');
        this.draw();
    }

    draw() {
        this.preview = new StreamPreviewView(this.payload);

        this.$view.append(this.preview.getView());
    }

    getName() {
        return this.name;
    }

    getView() {
        return this.$view;
    }

    update(streamPayload) {
        this.preview.update(streamPayload);
    }
}