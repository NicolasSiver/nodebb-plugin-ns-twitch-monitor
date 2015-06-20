/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';

export default class ChannelItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collapsed: true};
    }

    expandDidClick() {
        this.setState({collapsed: false});
    }

    render() {
        let content = null;
        const promptBlock = <button
            className="btn btn-sm btn-success"
            onClick={this.expandDidClick.bind(this)}
            type="button"><i className="fa fa-plus"></i>
        </button>;
        const formBlock = <div>
        </div>;

        content = this.state.collapsed ? promptBlock : null;

        return (
            <div className="clearfix">
                <div className="pull-right">
                    {content}
                </div>
            </div>
        );
    }
}