import Actions from '../actions/Actions';
import ClientIdForm from './ClientIdForm';
import connectToStores from 'alt/utils/connectToStores';
import isEmpty from 'lodash/lang/isEmpty';
import React from 'react';
import SettingsStore from '../stores/SettingsStore';
import ValidationStore from '../stores/ValidationStore';

class Settings extends React.Component {
    static getStores() {
        return [SettingsStore, ValidationStore];
    }

    static getPropsFromStores() {
        let settings = SettingsStore.getState(),
            validity = ValidationStore.getState();
        return {settings, validity};
    }

    constructor(props) {
        super(props);
    }

    clientValueDidChange(value) {
        Actions.validateClientId(value);
    }

    render() {
        let content;

        if (isEmpty(this.props.settings.data)) {
            content = <div><i className="fa fa-circle-o-notch fa-spin"></i> Please wait...</div>;
        } else {
            content = (
                <div>
                    <ClientIdForm
                        debounceDelay="500"
                        value={this.props.settings.data.clientId}
                        valid={this.props.validity.clientIdValidity}
                        valueDidChange={this.clientValueDidChange.bind(this)}/>
                    <div className="form-group">
                        <label className="control-label" htmlFor="updateTime">Update every</label>
                        <div id="updateTime">{this.props.settings.data.updateTime / 1000 | 0} sec</div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connectToStores(Settings);
