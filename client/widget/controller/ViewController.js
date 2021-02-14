export default class ViewController {
    constructor(view, limit) {
        this.view = view;
        this.limit = limit;
    }

    dispose() {
    }

    updateStream(streamPayload) {
        console.log(streamPayload);
        const channelName = streamPayload.channel.display_name;

        if (!streamPayload.stream) {
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
