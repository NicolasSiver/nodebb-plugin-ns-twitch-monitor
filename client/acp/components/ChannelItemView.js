/**
 * Created by Nicolas on 6/24/15.
 */
import React from 'react';

export default class ChannelItemView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="channel-item">
                <div className="channel-content">
                    <img className="channel-logo" src={this.props.channel.logo}/>

                    <div className="channel-info">
                        <h5 className="title">{this.props.channel.display_name} ({this.props.channel.game})</h5>
                        <p className="status">{this.props.channel.status}</p>
                    </div>

                    <div className="channel-stats">
                        <span className="stat"><i className="fa fa-eye"></i> {this.props.channel.views}</span>
                        <span className="stat"><i className="fa fa-heart"></i> {this.props.channel.followers}</span>
                    </div>
                </div>
            </li>
        );
    }
}
