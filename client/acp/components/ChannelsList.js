/**
 * Created by Nicolas on 6/20/15.
 */
import assign from 'lodash/object/assign';
import ChannelItemView from './ChannelItemView';
import ChannelsStore from '../stores/ChannelsStore';
import connectToStores from 'alt/utils/connectToStores';
import React from 'react/addons';
import StreamsStore from '../stores/StreamsStore';

class ChannelsList extends React.Component {
    static getStores() {
        return [ChannelsStore, StreamsStore];
    }

    static getPropsFromStores() {
        return assign(ChannelsStore.getState(), StreamsStore.getState());
    }

    constructor(props) {
        super(props);
    }

    render() {
        const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

        return (
            <div className="channels-list-container">
                <ul className="channels-list">
                    <ReactCSSTransitionGroup transitionName="alpha">
                        {this.renderItems(this.props.channels)}
                    </ReactCSSTransitionGroup>
                </ul>
            </div>
        );
    }

    renderItems(items) {
        // Prevent render if there is an ongoing request
        if (!items) {
            return null;
        }

        if (items.length) {
            return items.map((channel, index) => {
                return <ChannelItemView
                    key={channel.cid}
                    channel_info={channel}
                    channel={this.props.streams[channel.name}
                    live={!!this.props.streams[channel.name]}/>;
            });
        } else {
            return <div className="alert alert-warning" role="alert">There is no channels. Let's add some?</div>;
        }

    }
}

export default connectToStores(ChannelsList);
