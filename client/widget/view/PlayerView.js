/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';

export default class PlayerView {
    constructor(name, streamPayload) {
        this.name = name;
        this.payload = streamPayload;
        this.$view = $('<div></div>');
    }

    getName() {
        return this.name;
    }

    getView() {
        return this.$view;
    }
}