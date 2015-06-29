/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mainApplication = __webpack_require__(1);

	var _mainApplication2 = _interopRequireDefault(_mainApplication);

	//Register namespace for global objects
	window.ns = window.ns || {};

	//Bootstrapping main application
	window.ns.TwitchMonitor = new _mainApplication2['default']();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _eventsEvent = __webpack_require__(3);

	var _eventsEvent2 = _interopRequireDefault(_eventsEvent);

	var _viewFlexLayout = __webpack_require__(4);

	var _viewFlexLayout2 = _interopRequireDefault(_viewFlexLayout);

	var _serviceSocketService = __webpack_require__(7);

	var _serviceSocketService2 = _interopRequireDefault(_serviceSocketService);

	var _controllerViewController = __webpack_require__(10);

	var _controllerViewController2 = _interopRequireDefault(_controllerViewController);

	var TwitchMonitor = (function () {
	    function TwitchMonitor() {
	        _classCallCheck(this, TwitchMonitor);

	        this.socketService = new _serviceSocketService2['default']();
	        this.socketService.on(_eventsEvent2['default'].STREAM_DID_UPDATE, this.streamDidUpdate.bind(this));
	        this.socketService.on(_eventsEvent2['default'].STREAM_LIST_DID_UPDATE, this.streamListDidUpdate.bind(this));
	    }

	    _createClass(TwitchMonitor, [{
	        key: 'disposeIfNeeded',
	        value: function disposeIfNeeded() {
	            if (this.viewController) {
	                console.warn('Twitch Monitor is disposed');
	                this.viewController.dispose();
	                this.viewController = null;
	            }
	        }
	    }, {
	        key: 'init',
	        value: function init(limit, layoutDirection, containerSelector) {
	            this.disposeIfNeeded();
	            this.viewController = new _controllerViewController2['default'](new _viewFlexLayout2['default'](layoutDirection, containerSelector), limit);

	            //Populate view from cache
	            var cachedStreams = this.socketService.getCachedStreams();
	            for (var channelName in cachedStreams) {
	                this.streamDidUpdate(cachedStreams[channelName]);
	            }
	        }
	    }, {
	        key: 'streamDidUpdate',
	        value: function streamDidUpdate(streamPayload) {
	            this.viewController.updateStream(streamPayload);
	        }
	    }, {
	        key: 'streamListDidUpdate',
	        value: function streamListDidUpdate(list) {
	            for (var channelName in list) {
	                if (list.hasOwnProperty(channelName)) {
	                    this.streamDidUpdate(list[channelName]);
	                }
	            }
	        }
	    }]);

	    return TwitchMonitor;
	})();

	exports['default'] = TwitchMonitor;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	  STREAM_DID_UPDATE: 'streamDidUpdate',
	  STREAM_LIST_DID_UPDATE: 'streamListDidUpdate'
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _PlayerView = __webpack_require__(5);

	var _PlayerView2 = _interopRequireDefault(_PlayerView);

	var FlexLayout = (function () {
	    function FlexLayout(direction, selector) {
	        _classCallCheck(this, FlexLayout);

	        this.$root = (0, _jquery2['default'])(selector);
	        this.$container = (0, _jquery2['default'])('<div></div>').addClass('twitch-monitor-container').addClass(direction === 'vertical' ? 'layout-vertical' : 'layout-row');

	        this.$root.append(this.$container);

	        this.children = {};
	    }

	    _createClass(FlexLayout, [{
	        key: 'add',
	        value: function add(channelName, streamPayload) {
	            var player = new _PlayerView2['default'](channelName, streamPayload);
	            this.addChild(player);
	        }
	    }, {
	        key: 'addChild',
	        value: function addChild(widget) {
	            this.children[widget.getName()] = widget;
	            this.$container.append(widget.getView());
	        }
	    }, {
	        key: 'getStreamCount',
	        value: function getStreamCount() {
	            return Object.keys(this.children).length;
	        }
	    }, {
	        key: 'hasStream',
	        value: function hasStream(channelName) {
	            return !!this.children[channelName];
	        }
	    }, {
	        key: 'remove',
	        value: function remove(channelName, streamPayload) {
	            if (this.hasStream(channelName)) {
	                var widget = this.children[channelName];
	                widget.getView().remove();
	                delete this.children[channelName];
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update(channelName, streamPayload) {
	            this.children[channelName].update(streamPayload);
	        }
	    }]);

	    return FlexLayout;
	})();

	exports['default'] = FlexLayout;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _StreamPreviewView = __webpack_require__(6);

	var _StreamPreviewView2 = _interopRequireDefault(_StreamPreviewView);

	var PlayerView = (function () {
	    function PlayerView(name, streamPayload) {
	        _classCallCheck(this, PlayerView);

	        this.name = name;
	        this.payload = streamPayload;
	        this.$view = (0, _jquery2['default'])('<div></div>').addClass('twitch-monitor-player');
	        this.draw();
	    }

	    _createClass(PlayerView, [{
	        key: 'draw',
	        value: function draw() {
	            this.preview = new _StreamPreviewView2['default'](this.payload);

	            this.$view.append(this.preview.getView());
	        }
	    }, {
	        key: 'getName',
	        value: function getName() {
	            return this.name;
	        }
	    }, {
	        key: 'getView',
	        value: function getView() {
	            return this.$view;
	        }
	    }, {
	        key: 'update',
	        value: function update(streamPayload) {
	            this.preview.update(streamPayload);
	        }
	    }]);

	    return PlayerView;
	})();

	exports['default'] = PlayerView;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var StreamPreviewView = (function () {
	    function StreamPreviewView(streamPayload) {
	        _classCallCheck(this, StreamPreviewView);

	        this.$view = this.render(streamPayload);
	        this.$thumbnail = this.$view.find('.stream-thumbnail');
	        this.$viewerCount = this.$view.find('.stream-viewers');
	        this.$author = this.$view.find('.stream-author');
	        this.$game = this.$view.find('.stream-game');

	        this.$thumbnail.on('click', function () {
	            window.open(streamPayload.channel.url);
	        });

	        this.update(streamPayload);
	    }

	    _createClass(StreamPreviewView, [{
	        key: 'getView',
	        value: function getView() {
	            return this.$view;
	        }
	    }, {
	        key: 'render',
	        value: function render(streamPayload) {
	            var view = (0, _jquery2['default'])('<div/>', {
	                'class': 'stream-preview'
	            });
	            view.html('\n        <img class="stream-thumbnail"/>\n        <div class="stream-stats">\n            <i class="fa fa-user"></i><span class="stream-viewers"></span>\n        </div>\n        <div class="stream-info">\n            <div class="stream-logo-holder"><img class="stream-logo" src="' + streamPayload.channel.logo + '"/></div>\n            <div class="stream-information"><div class="stream-author"></div><div class="stream-game"></div>\n        </div>\n        ');
	            return view;
	        }
	    }, {
	        key: 'update',
	        value: function update(payload) {
	            this.$thumbnail.attr('src', payload.stream.preview.medium);
	            this.$viewerCount.text(payload.stream.viewers);
	            this.$author.text(payload.channel.display_name);
	            this.$game.text(payload.channel.game);
	        }
	    }]);

	    return StreamPreviewView;
	})();

	exports['default'] = StreamPreviewView;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _eventsEvent = __webpack_require__(3);

	var _eventsEvent2 = _interopRequireDefault(_eventsEvent);

	var _eventemitter3 = __webpack_require__(8);

	var _eventemitter32 = _interopRequireDefault(_eventemitter3);

	var _objectAssign = __webpack_require__(11);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _socket = __webpack_require__(9);

	var _socket2 = _interopRequireDefault(_socket);

	var CHANNELS = {
	    STREAM_UPDATE: 'plugins.ns-twitch-monitor.streamUpdate',
	    STREAMS_WITH_PAYLOAD: 'plugins.ns-twitch-monitor.streamPayloadsGet'
	};

	var SocketService = (function (_EventEmitter) {
	    function SocketService() {
	        var _this = this;

	        _classCallCheck(this, SocketService);

	        _get(Object.getPrototypeOf(SocketService.prototype), 'constructor', this).call(this);
	        this.cache = {};
	        setTimeout(function () {
	            _this.updateCache();
	            _this.subscribe();
	        }, 0);
	    }

	    _inherits(SocketService, _EventEmitter);

	    _createClass(SocketService, [{
	        key: 'getCachedStreams',
	        value: function getCachedStreams() {
	            return this.cache;
	        }
	    }, {
	        key: 'subscribe',
	        value: function subscribe() {
	            var _this2 = this;

	            _socket2['default'].on(CHANNELS.STREAM_UPDATE, function (payload) {
	                _this2.updateItemInCache(payload);
	                _this2.emit(_eventsEvent2['default'].STREAM_DID_UPDATE, payload);
	            });
	        }
	    }, {
	        key: 'updateCache',
	        value: function updateCache() {
	            var _this3 = this;

	            _socket2['default'].emit(CHANNELS.STREAMS_WITH_PAYLOAD, null, function (error, streamsWithPayload) {
	                if (error) {
	                    //Fail silently
	                    return console.warn('Error has occurred, can not update initial cache for twitch monitor, error: %s', error.message);
	                }
	                _this3.cache = (0, _objectAssign2['default'])({}, _this3.cache, streamsWithPayload);
	                _this3.emit(_eventsEvent2['default'].STREAM_LIST_DID_UPDATE, _this3.cache);
	            });
	        }
	    }, {
	        key: 'updateItemInCache',
	        value: function updateItemInCache(streamPayload) {
	            if (streamPayload) {
	                if (streamPayload.status === 'offline') {
	                    delete this.cache[streamPayload.channel.name];
	                } else {
	                    this.cache[streamPayload.channel.name] = streamPayload;
	                }
	            }
	        }
	    }]);

	    return SocketService;
	})(_eventemitter32['default']);

	exports['default'] = SocketService;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = socket;

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var ViewController = (function () {
	    function ViewController(view, limit) {
	        _classCallCheck(this, ViewController);

	        this.view = view;
	        this.limit = limit;
	    }

	    _createClass(ViewController, [{
	        key: 'dispose',
	        value: function dispose() {}
	    }, {
	        key: 'updateStream',
	        value: function updateStream(streamPayload) {
	            var channelName = streamPayload.channel.name;

	            if (streamPayload.status === 'offline') {
	                this.view.remove(channelName, streamPayload);
	            } else {
	                if (this.view.hasStream(channelName)) {
	                    this.view.update(channelName, streamPayload);
	                } else if (!this.view.hasStream(channelName) && this.view.getStreamCount() < this.limit) {
	                    this.view.add(channelName, streamPayload);
	                }
	            }
	        }
	    }]);

	    return ViewController;
	})();

	exports['default'] = ViewController;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function ownEnumerableKeys(obj) {
		var keys = Object.getOwnPropertyNames(obj);

		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(obj));
		}

		return keys.filter(function (key) {
			return propIsEnumerable.call(obj, key);
		});
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = ownEnumerableKeys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ }
/******/ ]);