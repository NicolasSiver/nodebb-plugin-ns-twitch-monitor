/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import ChannelsStore from '../stores/ChannelsStore';
import ChannelItemView from './ChannelItemView';

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
        let noItems, list;

        if (this.props.channels.length) {
            list = <ul>{this.props.channels.map((channel, index) => {
                return <ChannelItemView
                    key={channel.cid}
                    channel={channel}/>;
            })}</ul>;
        } else {
            noItems = <div className="alert alert-warning" role="alert">There is no channels. Let's add some?</div>;
        }

        return (
            <div className="channels-list">
                {noItems}
                {list}
            </div>
        );
    }
}

export default connectToStores(ChannelsList);
