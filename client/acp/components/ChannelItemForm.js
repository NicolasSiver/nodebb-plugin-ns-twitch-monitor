/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react/addons';

export default class ChannelItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collapsed: true};
    }

    isValid() {
        return false;
    }

    render() {
        const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        const promptBlock = <button
            className="btn btn-sm btn-primary"
            onClick={this.setExpandedState.bind(this, true)}
            type="button"><i className="fa fa-plus"></i>
        </button>;
        const formBlock = <div>
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="channelName">Enter Channel Name</label>
                    <input type="text" className="form-control input-sm" id="channelName" placeholder="Channel"/>
                </div>
                <div className="btn-group btn-group-sm" role="group">
                    <button
                        className="btn btn-danger"
                        onClick={this.setExpandedState.bind(this, false)}
                        type="button">Cancel
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={this.props.successDidClick}
                        disabled={this.isValid.bind(this) ? '' : 'disabled'}
                        type="button"><i className="fa fa-plus"></i> Add Item
                    </button>
                </div>
            </form>
        </div>;

        const content = this.state.collapsed ? promptBlock : formBlock;

        return (
            <div className="channel-item-form clearfix">
                <div className="pull-right">
                    <ReactCSSTransitionGroup transitionName="alpha">
                        {content}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }

    setExpandedState(state) {
        this.setState({collapsed: !state});
    }
}