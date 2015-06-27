/**
 * Created by Nicolas on 6/27/15.
 */
import ChannelsStore from '../stores/ChannelsStore';
import connectToStores from 'alt/utils/connectToStores';
import React from 'react';

class ChannelsHeader extends React.Component {
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
            <div className="channels-header">
                <h3>
                    Channels <small>{this.props.channels.length} from 100</small>
                </h3>
            </div>
        );
    }
}

export default connectToStores(ChannelsHeader);