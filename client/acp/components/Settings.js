/**
 * Created by Nicolas on 6/20/15.
 */
import Actions from '../actions/Actions';
import classNames from 'classnames';
import debounce from 'lodash/function/debounce';
import React from 'react';
import Validation from '../models/Validation';
import ValidationStore from '../stores/ValidationStore';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {feedback: 0};
        this.debounce = debounce(this.checkClientId.bind(this), 500);
    }

    checkClientId() {
        var clientId = this.state.clientId;
        if (clientId) {
            Actions.validateClientId(clientId);
        } else {
            console.warn('Client ID is empty');
            this.setState({feedback: Validation.FAILURE});
        }
    }

    clientIdDidChange(e) {
        this.setState({clientId: e.target.value}, () => {
            this.debounce();
        });
    }

    componentDidMount() {
        Actions.getSettings();
    }

    getInputByFeedback(feedback) {
        const hint = <small>Hint: you should <a href="http://www.twitch.tv/kraken/oauth2/clients/new" target="_blank">register
            Twitch Application</a> to get client id. Please review
            <a href="http://www.twitch.tv/user/legal?page=api_terms_of_service" target="_blank">Terms of Service</a> for
            the Twitch API.</small>;
        const groupClass = classNames({
            'form-group' : true,
            'has-success': feedback === Validation.SUCCESS,
            'has-error'  : feedback === Validation.FAILURE
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