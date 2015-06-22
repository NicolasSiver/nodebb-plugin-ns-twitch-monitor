/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';
import {ChannelsStore} from '../stores/ChannelsStore';

export default class ChannelsList extends React.Component {
    constructor(props) {
        super(props);
    }

    channelsDidChange(channels) {
        console.log(channels);
    }

    componentDidMount() {
        this.unsubscribe = ChannelsStore.listen(this.channelsDidChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="channels-list">
                <div className="alert alert-warning" role="alert">There is no channels. Let's add some?</div>
            </div>
        );
    }
}