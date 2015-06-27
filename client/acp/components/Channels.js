/**
 * Created by Nicolas on 6/20/15.
 */
import Actions from '../actions/Actions';
import ChannelItemForm from './ChannelItemForm';
import ChannelsList from './ChannelsList';
import React from 'react';

export default class Channels extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        Actions.getChannels();
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><i className="fa fa-twitch"></i> Twitch Monitor</div>
                <div className="panel-body">
                    <ChannelItemForm />
                    <ChannelsList />
                    <ChannelItemForm />
                </div>
            </div>
        );
    }
}