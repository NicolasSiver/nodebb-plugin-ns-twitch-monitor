import React from 'react';

import Actions from '../actions/Actions';
import ClientIdForm from './ClientIdForm';
import connectToStores from 'alt/utils/connectToStores';
import SettingsStore from '../stores/SettingsStore';
import ValidationStore from '../stores/ValidationStore';

class Settings extends React.Component {
    static getStores() {
        return [SettingsStore, ValidationStore];
    }

    static getPropsFromStores() {
        let settings   = SettingsStore.getState(),
            validation = ValidationStore.getState();
        return {settings, validation};
    }

    clientValueDidChange(value) {
        Actions.validateClientId(value);
    }

    render() {
        let content;

        if (isNaN(this.props.settings.updateDelay)) {
            content = <div><i className="fa fa-circle-o-notch fa-spin"></i> Please wait...</div>;
        } else {
            content = (
                <div>
                    <ClientIdForm
                        persisted={this.props.settings.clientIdPersisted}
                        persistValue={() => Actions.saveClientId(this.props.settings.clientId)}
                        valid={this.props.validation.clientIdValidity}
                        validating={this.props.validation.clientIdValidating}
                        value={this.props.settings.clientId}
                        valueDidChange={value => Actions.clientIdDidChange(value)}/>
                    <div className="form-group">
                        <label className="control-label" htmlFor="updateTime">Update every</label>
                        <div id="updateTime">{this.props.settings.updateDelay / 1000 | 0} sec</div>
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
