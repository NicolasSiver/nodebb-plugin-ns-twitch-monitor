/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import ChannelsStore from '../stores/ChannelsStore';

class ChannelsList extends React.Component {
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
        console.log('update', this.props);
        return (
            <div className="channels-list">
                <div className="alert alert-warning" role="alert">There is no channels. Let's add some?</div>
            </div>
        );
    }
}

export default connectToStores(ChannelsList);
