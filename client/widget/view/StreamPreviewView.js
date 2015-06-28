/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';

export default class StreamPreviewView {
    constructor(streamPayload) {
        this.$view = $('<div></div>');
        this.$thumb = $('<img />');

        this.$view.append(this.$thumb);

        update(streamPayload);
    }

    getView() {
        return this.$view;
    }

    update(payload) {
        this.$thumb.attr('src', payload.preview.medium);
    }
}