/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';

export default class StreamPreviewView {
    constructor(streamPayload) {
        this.$view = $('<div></div>');
        this.$thumb = $('<img />');

        this.$view.append(this.$thumb);

        this.update(streamPayload);
    }

    getView() {
        return this.$view;
    }

    update(payload) {
        const thumbMedium = payload.stream.preview.medium;
        this.$thumb.attr('src', thumbMedium);
    }
}