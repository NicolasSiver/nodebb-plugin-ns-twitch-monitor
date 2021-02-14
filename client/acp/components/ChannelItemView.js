/**
 * Created by Nicolas on 6/24/15.
 */
import Actions from '../actions/Actions';
import Bootbox from 'bootbox';
import classNames from 'classnames';
import React from 'react';

export default class ChannelItemView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mouseOver: false};
    }

    deleteItem() {
        Bootbox.confirm(`You are about to delete '${this.props.channel.user_name}' channel. Are you sure?`, (result) => {
            if (result) {
                Actions.channelWillRemove(this.props.channel.cid);
            }
        });
    }

    mouseDidEnter() {
        this.setState({mouseOver: true});
    }

    mouseDidLeave() {
        this.setState({mouseOver: false});
    }

    render() {
        let delay = (this.props.channel.delay) ?
            <span className="stat"><i className="fa fa-clock-o"></i> Delay is {this.props.channel.delay}</span> : null;
        let liveBadge = (this.props.live) ? <span className="channel-badge">LIVE</span> : null;
        let controlsClass = classNames({
            'channel-controls': true,
            'alpha-appear'    : this.state.mouseOver
        });
        console.log(this.props);
        
        var streamer_status = <small className="channel-prefix"> is offline </small>; 
        var viewer_number = 0;

        if (this.props.stream){
            streamer_status = <small className="channel-prefix"> playing </small> {this.props.channel.game_name};
            viewer_number = this.props.stream.viewer_count;
        }
        
        return (
            <li className="channel-item"
                onMouseEnter={this.mouseDidEnter.bind(this)}
                onMouseLeave={this.mouseDidLeave.bind(this)}>
                <div className="channel-content">
                    <div className="channel-picture">
                        <img className="channel-logo" src={this.props.channel.thumbnail_url}/>
                        {liveBadge}
                    </div>


                    <div className="channel-info">
                        <div className="title">
                            <a href={"https://twitch.tv/" + this.props.channel.display_name} target="_blank">{this.props.channel.user_name}</a>
                            {streamer_status}
                        </div>
                        <p className="status">{this.props.channel.type}</p>
                        <div className="channel-stats">
                            <span className="stat"><i className="fa fa-eye"></i> {viewer_number}</span>
                            //<span className="stat"><i className="fa fa-heart"></i> {this.props.channel.followers}</span>
                            {delay}
                        </div>
                    </div>

                    <div className={controlsClass}>
                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={this.deleteItem.bind(this)}><i className="fa fa-trash-o"></i> Delete
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}
