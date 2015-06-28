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

	var _eventsEvent = __webpack_require__(7);

	var _eventsEvent2 = _interopRequireDefault(_eventsEvent);

	var _viewHorizontalView = __webpack_require__(8);

	var _viewHorizontalView2 = _interopRequireDefault(_viewHorizontalView);

	var _serviceSocketService = __webpack_require__(4);

	var _serviceSocketService2 = _interopRequireDefault(_serviceSocketService);

	var _viewVerticalView = __webpack_require__(10);

	var _viewVerticalView2 = _interopRequireDefault(_viewVerticalView);

	var _controllerViewController = __webpack_require__(11);

	var _controllerViewController2 = _interopRequireDefault(_controllerViewController);

	var TwitchMonitor = (function () {
	    function TwitchMonitor() {
	        _classCallCheck(this, TwitchMonitor);

	        this.socketService = new _serviceSocketService2['default']();
	        this.socketService.on(_eventsEvent2['default'].STREAM_DID_UPDATE, this.streamDidUpdate.bind(this));
	    }

	    _createClass(TwitchMonitor, [{
	        key: 'createView',

	        /**
	         * Creates proper view for requested layout
	         * @param layout
	         * @param selector
	         * @returns {BaseView}
	         */
	        value: function createView(layout, selector) {
	            var view = null;

	            //TODO Support more types of layout?
	            if (layout === 'vertical') {
	                view = new _viewVerticalView2['default'](selector);
	            } else {
	                view = new _viewHorizontalView2['default'](selector);
	            }

	            return view;
	        }
	    }, {
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
	            this.viewController = new _controllerViewController2['default'](this.createView(layoutDirection, containerSelector), limit);
	        }
	    }, {
	        key: 'streamDidUpdate',
	        value: function streamDidUpdate(streamPayload) {
	            this.viewController.updateStream(streamPayload);
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
/* 3 */,
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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _eventsEvent = __webpack_require__(7);

	var _eventsEvent2 = _interopRequireDefault(_eventsEvent);

	var _eventemitter3 = __webpack_require__(6);

	var _eventemitter32 = _interopRequireDefault(_eventemitter3);

	var _socket = __webpack_require__(5);

	var _socket2 = _interopRequireDefault(_socket);

	var CHANNELS = {
	    STREAM_UPDATE: 'plugins.ns-twitch-monitor.streamUpdate'
	};

	var SocketService = (function (_EventEmitter) {
	    function SocketService() {
	        _classCallCheck(this, SocketService);

	        _get(Object.getPrototypeOf(SocketService.prototype), 'constructor', this).call(this);
	        this.subscribe();
	    }

	    _inherits(SocketService, _EventEmitter);

	    _createClass(SocketService, [{
	        key: 'subscribe',
	        value: function subscribe() {
	            var _this = this;

	            _socket2['default'].on(CHANNELS.STREAM_UPDATE, function (payload) {
	                _this.emit(_eventsEvent2['default'].STREAM_DID_UPDATE, payload);
	            });
	        }
	    }]);

	    return SocketService;
	})(_eventemitter32['default']);

	exports['default'] = SocketService;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = socket;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	  STREAM_DID_UPDATE: 'streamDidUpdate'
	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _BaseView2 = __webpack_require__(9);

	var _BaseView3 = _interopRequireDefault(_BaseView2);

	var HorizontalView = (function (_BaseView) {
	    function HorizontalView(selector) {
	        _classCallCheck(this, HorizontalView);

	        _get(Object.getPrototypeOf(HorizontalView.prototype), 'constructor', this).call(this, selector);
	    }

	    _inherits(HorizontalView, _BaseView);

	    return HorizontalView;
	})(_BaseView3['default']);

	exports['default'] = HorizontalView;
	module.exports = exports['default'];

/***/ },
/* 9 */
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

	var _PlayerView = __webpack_require__(12);

	var _PlayerView2 = _interopRequireDefault(_PlayerView);

	var BaseView = (function () {
	    function BaseView(selector) {
	        _classCallCheck(this, BaseView);

	        this.$container = (0, _jquery2['default'])(selector);
	        this.children = {};
	    }

	    _createClass(BaseView, [{
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
	        value: function remove(channelName, streamPayload) {}
	    }, {
	        key: 'update',
	        value: function update(channelName, streamPayload) {}
	    }]);

	    return BaseView;
	})();

	exports['default'] = BaseView;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Nicolas on 6/28/15.
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _BaseView2 = __webpack_require__(9);

	var _BaseView3 = _interopRequireDefault(_BaseView2);

	var VerticalView = (function (_BaseView) {
	    function VerticalView(selector) {
	        _classCallCheck(this, VerticalView);

	        _get(Object.getPrototypeOf(VerticalView.prototype), 'constructor', this).call(this, selector);
	    }

	    _inherits(VerticalView, _BaseView);

	    return VerticalView;
	})(_BaseView3['default']);

	exports['default'] = VerticalView;
	module.exports = exports['default'];

/***/ },
/* 11 */
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
/* 12 */
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

	var _StreamPreviewView = __webpack_require__(13);

	var _StreamPreviewView2 = _interopRequireDefault(_StreamPreviewView);

	var PlayerView = (function () {
	    function PlayerView(name, streamPayload) {
	        _classCallCheck(this, PlayerView);

	        this.name = name;
	        this.payload = streamPayload;
	        this.$view = (0, _jquery2['default'])('<div></div>');
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
	    }]);

	    return PlayerView;
	})();

	exports['default'] = PlayerView;
	module.exports = exports['default'];

/***/ },
/* 13 */
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

	        this.$view = (0, _jquery2['default'])('<div></div>');
	        this.$thumb = (0, _jquery2['default'])('<img />');

	        this.$view.append(this.$thumb);

	        this.update(streamPayload);
	    }

	    _createClass(StreamPreviewView, [{
	        key: 'getView',
	        value: function getView() {
	            return this.$view;
	        }
	    }, {
	        key: 'update',
	        value: function update(payload) {
	            this.$thumb.attr('src', payload.stream.preview.medium);
	        }
	    }]);

	    return StreamPreviewView;
	})();

	exports['default'] = StreamPreviewView;
	module.exports = exports['default'];

/***/ }
/******/ ]);