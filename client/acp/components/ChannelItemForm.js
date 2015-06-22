/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react/addons';
import {Actions} from '../actions/Actions';

export default class ChannelItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collapsed: true};
    }

    addChannel() {
        Actions.addChannel(this.state.channelName);
        //Reset state
        this.setState({
            collapsed  : true,
            channelName: ''
        });
    }

    channelNameDidChange(e) {
        this.setState({
            channelName: e.target.value
        });
    }

    isValid() {
        return !!this.state.channelName;
    }

    render() {
        const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        const promptBlock = <button
            className="btn btn-sm btn-primary"
            onClick={this.setExpandedState.bind(this, true)}
            type="button"><i className="fa fa-plus"></i>
        </button>;
        const formBlock = <div>
            <ReactCSSTransitionGroup transitionName="alpha" transitionAppear={true}>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="channelName">Channel Name</label>
                        <input
                            type="text"
                            className="form-control input-sm"
                            id="channelName"
                            value={this.state.channelName}
                            onChange={this.channelNameDidChange.bind(this)}
                            placeholder="Enter channel"/>
                    </div>
                    <div className="btn-group btn-group-sm" role="group">
                        <button
                            className="btn btn-danger"
                            onClick={this.setExpandedState.bind(this, false)}
                            type="button">Cancel
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={this.addChannel.bind(this)}
                            disabled={this.isValid() ? '' : 'disabled'}
                            type="button"><i className="fa fa-plus"></i> Add Item
                        </button>
                    </div>
                </form>
            </ReactCSSTransitionGroup>
        </div>;

        const content = this.state.collapsed ? promptBlock : formBlock;

        return (
            <div className="channel-item-form clearfix">
                <div className="pull-right">
                    {content}
                </div>
            </div>
        );
    }

    setExpandedState(state) {
        this.setState({collapsed: !state});
    }
}