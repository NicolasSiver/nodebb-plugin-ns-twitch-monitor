import ChannelItemForm from './ChannelItemForm';
import ChannelsList from './ChannelsList';
import ChannelsStats from './ChannelsStats';
import React from 'react';

export default class Channels extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ChannelItemForm />
                <ChannelsList />
                <ChannelsStats />
            </div>
        );
    }
}
