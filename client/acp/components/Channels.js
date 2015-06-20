/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';
import ChannelsList from './ChannelsList';
import ChannelItemForm from './ChannelItemForm';

export default class Channels extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><i className="fa fa-twitch"></i> Twitch Monitor</div>
                <div className="panel-body">
                    <ChannelItemForm />
                    <ChannelsList />
                </div>
            </div>
        );
    }
}