import classNames from 'classnames';
import debounce from 'lodash/function/debounce';
import React from 'react';
import Validation from '../models/Validation';

export default class ClientIdForm extends React.Component {
    constructor(props) {
        super(props);
        this.debounce = debounce(this.checkValue.bind(this), props.debounceDelay);
    }

    checkValue() {
        this.props.valueDidChange(this.state.clientId);
    }

    clientIdDidChange(e) {
        this.setState({clientId: e.target.value}, () => {
            this.debounce();
        });
    }

    render() {
        const groupClass = classNames({
            'form-group'           : true,
            'client-id-form__input': true,
            'has-success'          : this.props.valid === Validation.SUCCESS,
            'has-error'            : this.props.valid === Validation.FAILURE
        });

        return (
            <div className="client-id-form">
                <div className={groupClass}>
                    <label className="control-label" htmlFor="clientId">Client ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clientId"
                        defaultValue={this.props.value}
                        onChange={this.clientIdDidChange.bind(this)}
                        placeholder="Twitch Client ID"/>
                    <small>
                        Hint: you should <a href="http://www.twitch.tv/kraken/oauth2/clients/new" target="_blank">register
                        Twitch Application</a> to get client id.
                        Please review
                        <a href="http://www.twitch.tv/user/legal?page=api_terms_of_service" target="_blank">Terms
                            of Service</a> for the Twitch API.
                    </small>
                </div>
                <div className="client-id-form__controls">
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={null}><i className="fa fa-refresh fa-spin"></i> Validate
                    </button>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={null}><i className="fa fa-floppy-o"></i> Save
                    </button>
                </div>
            </div>
        );
    }
}