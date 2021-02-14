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
            window.open('https://twitch.tv/' + streamPayload.channel.display_name);
        });

        this.update(streamPayload);
    }

    getView() {
        return this.$view;
    }


    render(streamPayload) {
        var styling = '';
        var view = $('<div/>', {
            'class': 'stream-preview'
        });
        view.html(`
        <div class="stream-thumbnail-holder">
            <img class="stream-thumbnail"/>
        </div>
        <div class="stream-stats">
            <i class="fa fa-user"></i><span class="stream-viewers"></span>
        </div>
        <div class="stream-info">
            <div class="stream-logo-holder"><img class="stream-logo" src="${streamPayload.channel.profile_image_url}"/></div>
            <div class="stream-information"><div class="stream-author"></div><div class="stream-game"></div>
        </div>
        `);
        return view;
    }

    update(payload) {
        var thumbnail_url = payload.stream.thumbnail_url;
        var image_scale = 0.3;
        thumbnail_url = thumbnail_url.replace('{width}', 720 * image_scale);
        thumbnail_url = thumbnail_url.replace('{height}', 480 * image_scale);
        this.$thumbnail.attr('src', thumbnail_url);
        this.$viewerCount.text(payload.stream.viewer_count);
        this.$author.text(payload.channel.display_name);
        this.$game.text(payload.stream.game_name);
    }
}
