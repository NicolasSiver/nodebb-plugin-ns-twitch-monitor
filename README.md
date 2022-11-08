# This fork

**The admin part of this plugin uses very outdated libraries. I need help updating it**

I updated the plugin to use the new twitch API, and updated some libraries for the widget code. To make it work, you must the following code in the global footer of the page
```
<script>
    'use strict';

    $(document).ready(function () {
        var limit  = <limit>,
            layout = '<layout>';

        ns.TwitchMonitor.init(limit, layout, '.widget-twitch-monitor');
    });
</script>
```

limit is the number of streams you want to show, and layout is either 'horizontal' or 'vertical'. The widget settings you set won't work.

This fork makes this plugin work as of NodeBB 1.19.0. Validation is broken, but you have to get your own client ID and Bearer token using the twitch API. You can query the endpoint https://id.twitch.tv/oauth2/token?client_id=\<your client id\>&client_secret=\<your client secret\>&grant_type=client_credentials&scope=user:read:email to get the bearer token.

## Notes  for people who want to help

To build the acp and widget javascript files, you must use browserify and webpack, respectively. After you compile the acp, you must move the bootbox definitions on line 500 of public/js/acp.js into the prompForChannel function, and do the same thing with the ones on line 583 into deleteItem, or else you won't be able to add or delete channels.

### TODOS:
- Critical: Update the acp page to correctly use bootbox and to use newer module versions.
- Put the initialization script into the template so the widget settings work.
- The original TODOs


# NodeBB: Twitch Monitor

Monitors specific channels and adds them to widget view
![Version](https://img.shields.io/npm/v/nodebb-plugin-ns-twitch-monitor.svg)
![Dependencies](https://david-dm.org/NicolasSiver/nodebb-plugin-ns-twitch-monitor.svg)
[![bitHound Score](https://www.bithound.io/github/NicolasSiver/nodebb-plugin-ns-twitch-monitor/badges/score.svg?)](https://www.bithound.io/github/NicolasSiver/nodebb-plugin-ns-twitch-monitor)
![Code Climate](https://img.shields.io/codeclimate/github/NicolasSiver/nodebb-plugin-ns-twitch-monitor.svg)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [Notes](#notes)
- [Look](#look)
  - [ACP](#acp)
  - [Widget](#widget)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Notes

- At Server start, some time is needed to fetch enough data for stream statuses
- Highly recommended to limit concurrent streams in widget view, by default - 3

## Look

### ACP

![Admin Panel View](screenshot.png)

### Widget

![Horizontal Widget View](screenshot2.png)

## TODO

- ACP: Show progress on channel add
- ACP: Show animated update ticks
- ACP: Update stream status in real time
- Tests: add tests client and server
- Core: use stream pagination
- Core: smart list update - merge online/offline states, etc
- Core: batch stream status updates
- Core: edit update time
- Widget: create cross-fade thumbnail update
- Widget: use Twitch Video Player



