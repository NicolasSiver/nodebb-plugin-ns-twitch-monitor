/**
 * Created by Nicolas on 6/28/15.
 */

export default class ViewController {
    constructor(view, limit) {
        this.view = view;
        this.limit = limit;
    }

    dispose() {
    }

    updateStream(streamPayload) {
        const channelName = streamPayload.channel.name;

        if (streamPayload.status === 'offline') {
            this.view.remove(channelName, streamPayload);
        } else {
            if (this.view.hasStream(channelName)) {
                this.view.update(channelName, streamPayload);
            } else if (!this.view.hasStream(channelName) && this.view.getStreamCount() < this.limit) {
                this.view.add(channelName, streamPayload);
            }
        }
    }
}