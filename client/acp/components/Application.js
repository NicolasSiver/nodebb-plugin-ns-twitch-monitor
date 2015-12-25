import Actions from '../actions/Actions';
import React from 'react';
import TabManager from './TabManager';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Actions.getSettings();
        Actions.getChannels();
        Actions.getStreams();
        Actions.subscribe();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <TabManager />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
