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
        let noItems, list;
        const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

        if (this.props.channels.length) {
            list = (
                <ul className="channels-list">
                    <ReactCSSTransitionGroup transitionName="alpha">
                        {this.props.channels.map((channel, index) => {
                            return <ChannelItemView
                                key={channel.cid}
                                channel={channel}
                                live={!!this.props.streams[channel.name]}/>;
                        })}
                    </ReactCSSTransitionGroup>
                </ul>
            );
        } else {
            noItems = <div className="alert alert-warning" role="alert">There is no channels. Let's add some?</div>;
        }

        return (
            <div className="channels-list-container">
                {noItems}
                {list}
            </div>
        );
    }
}

export default connectToStores(ChannelsList);
