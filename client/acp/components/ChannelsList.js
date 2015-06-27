/**
 * Created by Nicolas on 6/20/15.
 */
import ChannelItemView from './ChannelItemView';
import ChannelsStore from '../stores/ChannelsStore';
import connectToStores from 'alt/utils/connectToStores';
import React from 'react/addons';

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
        const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

        if (this.props.channels.length) {
            list = (
                <ul className="channels-list">
                    <ReactCSSTransitionGroup transitionName="alpha">
                        {this.props.channels.map((channel, index) => {
                            return <ChannelItemView
                                key={channel.cid}
                                channel={channel}/>;
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
