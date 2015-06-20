/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';

export default class Channels extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><i className="fa fa-twitch"></i> Twitch Monitor</div>
                <div className="panel-body">
                    <div>
                        <div className="alert alert-warning" role="alert">There is no channels. Let's add some?</div>
                    </div>
                </div>
            </div>
        );
    }
}