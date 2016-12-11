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
