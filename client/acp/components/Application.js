/**
 * Created by Nicolas on 6/20/15.
 */
import Channels from './Channels';
import Donate from './Donate';
import React from 'react';
import Settings from './Settings';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-7">
                    <Channels />
                </div>
                <div className="col-md-5">
                    <Settings />
                    <Donate />
                </div>
            </div>
        );
    }
}