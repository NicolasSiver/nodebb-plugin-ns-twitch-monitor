/**
 * Created by Nicolas on 6/20/15.
 */
import Actions from '../actions/Actions';
import Bootbox from 'bootbox';
import KeyCode from '../models/KeyCode';
import React from 'react/addons';

export default class ChannelItemForm extends React.Component {
    constructor(props) {
        super(props);
    }

    promptForChannel() {
        Bootbox.prompt("What is the channel's id?", function (result) {
            if (result) {
                Actions.addChannel(result);
            }
        });
    }

    render() {
        return (
            <div className="channel-item-form clearfix">
                <div>
                    <a href="#" onClick={this.promptForChannel}><i className="fa fa-plus"></i> Add Twitch Channel</a>
                </div>
            </div>
        );
    }
}
