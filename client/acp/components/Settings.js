/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Settings</div>
                <div className="panel-body">
                    <div className="form-group">
                        <label htmlFor="clientId">Client ID</label>
                        <input type="text" className="form-control" id="clientId" placeholder="Twitch Client ID"/>
                        <small>Hint: you should <a href="http://www.twitch.tv/kraken/oauth2/clients/new" target="_blank">register Twitch Application</a> to get client id.</small>
                    </div>
                </div>
            </div>
        );
    }
}