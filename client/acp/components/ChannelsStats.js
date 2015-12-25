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
        return (
            <div className="channels-stats">
                <div className="channels-number"><b>Channels:</b> {this.props.channels.length} from 100</div>
            </div>
        );
    }
}

export default connectToStores(ChannelsStats);
