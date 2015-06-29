/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';

export default class StreamPreviewView {
    constructor(streamPayload) {
        this.$view = this.render(streamPayload);
        this.$thumbnail = this.$view.find('.stream-thumbnail');
        this.$viewerCount = this.$view.find('.stream-viewers');
        this.$author = this.$view.find('.stream-author');
        this.$game = this.$view.find('.stream-game');

        this.$thumbnail.on('click', () => {
            window.open(streamPayload.channel.url);
        });

        this.update(streamPayload);
    }

    getView() {
        return this.$view;
    }

    render(streamPayload) {
        var view = $('<div/>', {
            'class': 'stream-preview'
        });
        view.html(`
        <img class="stream-thumbnail"/>
        <div class="stream-stats">
            <i class="fa fa-user"></i><span class="stream-viewers"></span>
        </div>
        <div class="stream-info">
            <div class="stream-logo-holder"><img class="stream-logo" src="${streamPayload.channel.logo}"/></div>
            <div class="stream-information"><div class="stream-author"></div><div class="stream-game"></div>
        </div>
        `);
        return view;
    }

    update(payload) {
        this.$thumbnail.attr('src', payload.stream.preview.medium);
        this.$viewerCount.text(payload.stream.viewers);
        this.$author.text(payload.channel.display_name);
        this.$game.text(payload.channel.game);
    }
}