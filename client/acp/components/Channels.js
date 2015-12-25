import Actions from '../actions/Actions';
import ChannelItemForm from './ChannelItemForm';
import ChannelsList from './ChannelsList';
import ChannelsStats from './ChannelsStats';
import React from 'react';

export default class Channels extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Actions.getChannels();
        Actions.getStreams();
        Actions.subscribe();
    }

    render() {
        return (
            <div>
                <ChannelItemForm />
                <ChannelsList />
                <ChannelItemForm />
                <ChannelsStats />
            </div>
        );
    }
}