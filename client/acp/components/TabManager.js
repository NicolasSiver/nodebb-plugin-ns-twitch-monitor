import Actions from '../actions/Actions';
import Channels from './Channels';
import classNames from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import Donate from './Donate';
import NavigationStore from '../stores/NavigationStore';
import React from 'react';
import * as Sections from '../models/Sections';
import Settings from './Settings';

class TabManager extends React.Component {
    static getStores() {
        return [NavigationStore];
    }

    static getPropsFromStores() {
        let navigation = NavigationStore.getState();
        return {navigation};
    }

    getContent(section) {
        switch (section) {
            case Sections.CHANNELS:
                return <Channels />;
            case Sections.SETTINGS:
                return <Settings />;
        }
    }


    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    {this.props.navigation.sections.map((section) => {
                        let icon, sectionClass = classNames({
                            'active': section.id === this.props.navigation.currentSection
                        });
                        if ('icon' in section) {
                            icon = <i className={'fa ' + section.icon}></i>;
                        }
                        return (
                            <li key={section.id} className={sectionClass}>
                                <a href="#" onClick={this.sectionDidClick.bind(null, section)}>{icon} {section.label}</a>
                            </li>
                        );
                    })}
                </ul>

                <div className="tab-content">
                    <div className="tab-pane active">
                        {this.getContent(this.props.navigation.currentSection)}
                    </div>
                </div>

            </div>
        );
    }

    sectionDidClick(section) {
        Actions.setSection(section.id);
    }
}

export default connectToStores(TabManager);