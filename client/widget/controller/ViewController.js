export default class ViewController {
    constructor(view, limit) {
        this.view = view;
        this.limit = limit;
    }

    dispose() {
    }

    updateStream(streamPayload) {
        const channelName = streamPayload.channel.display_name;

        var removeChance = 0;
        if (this.view.getStreamCount() >= this.limit){
            removeChance = 0.5;
        }
        if (!streamPayload.stream || removeChance > Math.random()) {
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
