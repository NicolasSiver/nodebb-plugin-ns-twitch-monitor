/**
 * Created by Nicolas on 6/24/15.
 */
import Actions from '../actions/Actions';
import classNames from 'classnames';
import React from 'react';

export default class ChannelItemView extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteItem() {
        Actions.channelWillRemove(this.props.channel.cid);
    }

    render() {
        let delay = this.props.channel.delay || 'no';
        const statusClass = classNames({
            'fa'       : true,
            'fa-circle': true,
            'online'   : this.props.live
        });

        return (
            <li className="channel-item">
                <div className="channel-content">
                    <img className="channel-logo" src={this.props.channel.logo}/>

                    <div className="channel-info">
                        <div className="title">
                            <a href={this.props.channel.url} target="_blank">{this.props.channel.display_name}</a> ({this.props.channel.game})
                        </div>
                        <p className="status">{this.props.channel.status}</p>
                    </div>

                    <div className="channel-stats">
                        <span className="stat"><i className="fa fa-eye"></i> {this.props.channel.views}</span>
                        <span className="stat"><i className="fa fa-heart"></i> {this.props.channel.followers}</span>
                        <span className="stat"><i className="fa fa-clock-o"></i> {delay}</span>
                    </div>

                    <div className="channel-status">
                        <i className={statusClass}></i>
                    </div>

                    <div className="channel-controls">
                        <div className="control-delete" onClick={this.deleteItem.bind(this)}>
                            <i className="fa fa-trash-o"></i>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
