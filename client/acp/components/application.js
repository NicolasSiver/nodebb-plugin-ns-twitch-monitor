/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';
import Settings from './settings';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-7">

                </div>
                <div className="col-md-5">
                    <Settings />
                </div>
            </div>
        );
    }
}