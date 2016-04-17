import ChannelsStore from '../stores/ChannelsStore';
import connectToStores from 'alt/utils/connectToStores';
import React from 'react';

class ChannelsStats extends React.Component {
    static getStores() {
        return [ChannelsStore];
    }

    static getPropsFromStores() {
        return ChannelsStore.getState();
    }

    constructor(props) {
        super(props);
    }

    render() {
        let count = (this.props.channels) ? this.props.channels.length : 0;
        return (
            <div className="channels-stats">
                <div className="channels-number"><b>Channels:</b> {count} from 100</div>
            </div>
        );
    }
}

export default connectToStores(ChannelsStats);
