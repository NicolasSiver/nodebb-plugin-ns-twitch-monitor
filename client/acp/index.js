import Application from './components/Application';
import Define from 'define';
import React from 'react';

Define('admin/plugins/twitch-monitor', [], () => {
    return {
        init: function () {
            React.render(
                <Application />,
                document.getElementById('acpTwitchMonitor')
            );
        }
    };
});
