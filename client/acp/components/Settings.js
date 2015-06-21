/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';
import classNames from 'classnames';
import debounce from 'lodash/function/debounce';
import {Actions} from '../actions/Actions';

const FEEDBACK = {
    NORMAL : 0,
    SUCCESS: 1,
    FAILURE: 2
};

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {feedback: FEEDBACK.NORMAL};
        this.debounce = debounce(this.checkClientId.bind(this), 500);
    }

    checkClientId() {
        if (this.state.clientId) {

        } else {
            console.warn('Client ID is empty');
            this.setState({feedback: FEEDBACK.FAILURE});
        }
    }

    clientIdDidChange(e) {
        this.setState({clientId: e.target.value}, () => {
            this.debounce();
        });
    }

    getInputByFeedback(feedback) {
        const hint = <small>Hint: you should <a href="http://www.twitch.tv/kraken/oauth2/clients/new" target="_blank">register Twitch Application</a> to get client id.</small>;
        const groupClass = classNames({
            'form-group' : true,
            'has-success': feedback === FEEDBACK.SUCCESS,
            'has-error'  : feedback === FEEDBACK.FAILURE
        });

        return (
            <div className={groupClass}>
                <label className="control-label" htmlFor="clientId">Client ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="clientId"
                    value={this.state.clientId}
                    onChange={this.clientIdDidChange.bind(this)}
                    placeholder="Twitch Client ID"/>
                {hint}
            </div>
        );
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Settings</div>
                <div className="panel-body">
                    {this.getInputByFeedback(this.state.feedback)}
                </div>
            </div>
        );
    }
}