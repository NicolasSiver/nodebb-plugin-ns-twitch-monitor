/**
 * Created by Nicolas on 6/20/15.
 */
import React from 'react';

export default class ChannelsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="alert alert-warning" role="alert">There is no channels. Let's add some?</div>
            </div>
        );
    }
}