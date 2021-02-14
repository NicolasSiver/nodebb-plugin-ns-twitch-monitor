/**
 * Created by Nicolas on 6/20/15.
 */
import Actions from '../actions/Actions';
import KeyCode from '../models/KeyCode';
import React, {useState} from 'react';
import  Bootbox  from  'bootbox-react';



export default class ChannelItemForm extends React.Component {
    constructor(props) {
        super(props);
        const [showEnterChannel, setShowEnterChannel] = useState(false);
    }

    promptForChannel(result) {
        if (result) {
            Actions.addChannel(result);
        }
    }

    render() {
        return (
            <div className="channel-item-form clearfix">
                <div>
                    <a href="#" onClick={() => setShowEnterChannel(true)}><i className="fa fa-plus"></i> Add Twitch Channel</a>
            <Bootbox show={showEnterCHannel} 
                type={"prompt"}  
                message={"What's the channel id?"}  
                onPrompt={promptForChannel} 
            />
                </div>
            </div>
        );
    }
}
