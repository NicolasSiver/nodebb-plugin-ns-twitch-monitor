!(function (e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = (n[r] = { exports: {}, id: r, loaded: !1 });
        return e[r].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = ""), t(0);
})([
    function (e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : { default: e };
        }
        var i = n(1),
            a = r(i);
        (window.ns = window.ns || {}), (window.ns.TwitchMonitor = new a["default"]());
    },
    function (e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a = (function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                    }
                }
                return function (t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            })(),
            o = n(2),
            s = (r(o), n(3)),
            u = r(s),
            c = n(4),
            l = r(c),
            f = n(7),
            h = r(f),
            d = n(11),
            v = r(d),
            p = (function () {
                function e() {
                    i(this, e),
                        (this.socketService = new h["default"]()),
                        this.socketService.on(u["default"].STREAM_DID_UPDATE, this.streamDidUpdate.bind(this)),
                        this.socketService.on(u["default"].STREAM_LIST_DID_UPDATE, this.streamListDidUpdate.bind(this));
                }
                return (
                    a(e, [
                        {
                            key: "disposeIfNeeded",
                            value: function () {
                                this.viewController && (console.warn("Twitch Monitor is disposed"), this.viewController.dispose(), (this.viewController = null));
                            },
                        },
                        {
                            key: "init",
                            value: function (e, t, n) {
                                this.disposeIfNeeded(), (this.viewController = new v["default"](new l["default"](t, n), e));
                                var r = this.socketService.getCachedStreams();
                                for (var i in r) this.streamDidUpdate(r[i]);
                            },
                        },
                        {
                            key: "streamDidUpdate",
                            value: function (e) {
                                this.viewController && this.viewController.updateStream(e);
                            },
                        },
                        {
                            key: "streamListDidUpdate",
                            value: function (e) {
                                for (var t in e) e.hasOwnProperty(t) && this.streamDidUpdate(e[t]);
                            },
                        },
                    ]),
                    e
                );
            })();
        (t["default"] = p), (e.exports = t["default"]);
    },
    function (e, t) {
        e.exports = jQuery;
    },
    function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t["default"] = { STREAM_DID_UPDATE: "streamDidUpdate", STREAM_LIST_DID_UPDATE: "streamListDidUpdate" }), (e.exports = t["default"]);
    },
    function (e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a = (function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                    }
                }
                return function (t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            })(),
            o = n(2),
            s = r(o),
            u = n(5),
            c = r(u),
            l = (function () {
                function e(t, n) {
                    i(this, e),
                        (this.$root = (0, s["default"])(n)),
                        (this.$container = (0, s["default"])("<div></div>")
                            .addClass("twitch-monitor-container")
                            .addClass("vertical" === t ? "layout-vertical" : "layout-row")),
                        this.$root.append(this.$container),
                        (this.children = {});
                }
                return (
                    a(e, [
                        {
                            key: "add",
                            value: function (e, t) {
                                var n = new c["default"](e, t);
                                this.addChild(n);
                            },
                        },
                        {
                            key: "addChild",
                            value: function (e) {
                                (this.children[e.getName()] = e), this.$container.append(e.getView());
                            },
                        },
                        {
                            key: "getStreamCount",
                            value: function () {
                                return Object.keys(this.children).length;
                            },
                        },
                        {
                            key: "hasStream",
                            value: function (e) {
                                return !!this.children[e];
                            },
                        },
                        {
                            key: "remove",
                            value: function (e, t) {
                                if (this.hasStream(e)) {
                                    var n = this.children[e];
                                    n.getView().remove(), delete this.children[e];
                                }
                            },
                        },
                        {
                            key: "update",
                            value: function (e, t) {
                                this.children[e].update(t);
                            },
                        },
                    ]),
                    e
                );
            })();
        (t["default"] = l), (e.exports = t["default"]);
    },
    function (e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a = (function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                    }
                }
                return function (t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            })(),
            o = n(2),
            s = r(o),
            u = n(6),
            c = r(u),
            l = (function () {
                function e(t, n) {
                    i(this, e), (this.name = t), (this.payload = n), (this.$view = (0, s["default"])("<div></div>").addClass("twitch-monitor-player")), this.draw();
                }
                return (
                    a(e, [
                        {
                            key: "draw",
                            value: function () {
                                (this.preview = new c["default"](this.payload)), this.$view.append(this.preview.getView());
                            },
                        },
                        {
                            key: "getName",
                            value: function () {
                                return this.name;
                            },
                        },
                        {
                            key: "getView",
                            value: function () {
                                return this.$view;
                            },
                        },
                        {
                            key: "update",
                            value: function (e) {
                                this.preview.update(e);
                            },
                        },
                    ]),
                    e
                );
            })();
        (t["default"] = l), (e.exports = t["default"]);
    },
    function (e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a = (function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                    }
                }
                return function (t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            })(),
            o = n(2),
            s = r(o),
            u = (function () {
                function e(t) {
                    i(this, e),
                        (this.$view = this.render(t)),
                        (this.$thumbnail = this.$view.find(".stream-thumbnail")),
                        (this.$viewerCount = this.$view.find(".stream-viewers")),
                        (this.$author = this.$view.find(".stream-author")),
                        (this.$game = this.$view.find(".stream-game")),
                        this.$thumbnail.on("click", function () {
                            window.open(t.channel.url);
                        }),
                        this.update(t);
                }
                return (
                    a(e, [
                        {
                            key: "getView",
                            value: function () {
                                return this.$view;
                            },
                        },
                        {
                            key: "render",
                            value: function (e) {
                                var t = (0, s["default"])("<div/>", { class: "stream-preview" });
                                return (
                                    t.html(
                                        '\n        <div class="stream-thumbnail-holder">\n            <img class="stream-thumbnail"/>\n        </div>\n        <div class="stream-stats">\n            <i class="fa fa-user"></i><span class="stream-viewers"></span>\n        </div>\n        <div class="stream-info">\n            <div class="stream-logo-holder"><img class="stream-logo" src="' +
                                            e.channel.logo +
                                            '"/></div>\n            <div class="stream-information"><div class="stream-author"></div><div class="stream-game"></div>\n        </div>\n        '
                                    ),
                                    t
                                );
                            },
                        },
                        {
                            key: "update",
                            value: function (e) {
                                this.$thumbnail.attr("src", e.stream.preview.medium), this.$viewerCount.text(e.stream.viewers), this.$author.text(e.channel.display_name), this.$game.text(e.channel.game);
                            },
                        },
                    ]),
                    e
                );
            })();
        (t["default"] = u), (e.exports = t["default"]);
    },
    function (e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o = (function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                    }
                }
                return function (t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            })(),
            s = function (e, t, n) {
                for (var r = !0; r; ) {
                    var i = e,
                        a = t,
                        o = n;
                    (r = !1), null === i && (i = Function.prototype);
                    var s = Object.getOwnPropertyDescriptor(i, a);
                    if (void 0 !== s) {
                        if ("value" in s) return s.value;
                        var u = s.get;
                        if (void 0 === u) return;
                        return u.call(o);
                    }
                    var c = Object.getPrototypeOf(i);
                    if (null === c) return;
                    (e = c), (t = a), (n = o), (r = !0), (s = c = void 0);
                }
            },
            u = n(3),
            c = r(u),
            l = n(8),
            f = r(l),
            h = n(9),
            d = r(h),
            v = n(10),
            p = r(v),
            m = { STREAM_UPDATE: "plugins.ns-twitch-monitor.streamUpdate", STREAMS_WITH_PAYLOAD: "plugins.ns-twitch-monitor.streamPayloadsGet" },
            y = (function (e) {
                function t() {
                    var e = this;
                    i(this, t),
                        s(Object.getPrototypeOf(t.prototype), "constructor", this).call(this),
                        (this.cache = {}),
                        setTimeout(function () {
                            e.updateCache(), e.subscribe();
                        }, 0);
                }
                return (
                    a(t, e),
                    o(t, [
                        {
                            key: "getCachedStreams",
                            value: function () {
                                return this.cache;
                            },
                        },
                        {
                            key: "subscribe",
                            value: function () {
                                var e = this;
                                p["default"].on(m.STREAM_UPDATE, function (t) {
                                    e.updateItemInCache(t), e.emit(c["default"].STREAM_DID_UPDATE, t);
                                });
                            },
                        },
                        {
                            key: "updateCache",
                            value: function () {
                                var e = this;
                                p["default"].emit(m.STREAMS_WITH_PAYLOAD, null, function (t, n) {
                                    return t
                                        ? console.warn("Error has occurred, can not update initial cache for twitch monitor, error: %s", t.message)
                                        : ((e.cache = (0, d["default"])({}, e.cache, n)), void e.emit(c["default"].STREAM_LIST_DID_UPDATE, e.cache));
                                });
                            },
                        },
                        {
                            key: "updateItemInCache",
                            value: function (e) {
                                e && ("offline" === e.status ? delete this.cache[e.channel.name] : (this.cache[e.channel.name] = e));
                            },
                        },
                    ]),
                    t
                );
            })(f["default"]);
        (t["default"] = y), (e.exports = t["default"]);
    },
    function (e, t, n) {
        "use strict";
        function r(e, t, n) {
            (this.fn = e), (this.context = t), (this.once = n || !1);
        }
        function i() {}
        var a = "function" != typeof Object.create ? "~" : !1;
        (i.prototype._events = void 0),
            (i.prototype.listeners = function (e, t) {
                var n = a ? a + e : e,
                    r = this._events && this._events[n];
                if (t) return !!r;
                if (!r) return [];
                if (r.fn) return [r.fn];
                for (var i = 0, o = r.length, s = new Array(o); o > i; i++) s[i] = r[i].fn;
                return s;
            }),
            (i.prototype.emit = function (e, t, n, r, i, o) {
                var s = a ? a + e : e;
                if (!this._events || !this._events[s]) return !1;
                var u,
                    c,
                    l = this._events[s],
                    f = arguments.length;
                if ("function" == typeof l.fn) {
                    switch ((l.once && this.removeListener(e, l.fn, void 0, !0), f)) {
                        case 1:
                            return l.fn.call(l.context), !0;
                        case 2:
                            return l.fn.call(l.context, t), !0;
                        case 3:
                            return l.fn.call(l.context, t, n), !0;
                        case 4:
                            return l.fn.call(l.context, t, n, r), !0;
                        case 5:
                            return l.fn.call(l.context, t, n, r, i), !0;
                        case 6:
                            return l.fn.call(l.context, t, n, r, i, o), !0;
                    }
                    for (c = 1, u = new Array(f - 1); f > c; c++) u[c - 1] = arguments[c];
                    l.fn.apply(l.context, u);
                } else {
                    var h,
                        d = l.length;
                    for (c = 0; d > c; c++)
                        switch ((l[c].once && this.removeListener(e, l[c].fn, void 0, !0), f)) {
                            case 1:
                                l[c].fn.call(l[c].context);
                                break;
                            case 2:
                                l[c].fn.call(l[c].context, t);
                                break;
                            case 3:
                                l[c].fn.call(l[c].context, t, n);
                                break;
                            default:
                                if (!u) for (h = 1, u = new Array(f - 1); f > h; h++) u[h - 1] = arguments[h];
                                l[c].fn.apply(l[c].context, u);
                        }
                }
                return !0;
            }),
            (i.prototype.on = function (e, t, n) {
                var i = new r(t, n || this),
                    o = a ? a + e : e;
                return this._events || (this._events = a ? {} : Object.create(null)), this._events[o] ? (this._events[o].fn ? (this._events[o] = [this._events[o], i]) : this._events[o].push(i)) : (this._events[o] = i), this;
            }),
            (i.prototype.once = function (e, t, n) {
                var i = new r(t, n || this, !0),
                    o = a ? a + e : e;
                return this._events || (this._events = a ? {} : Object.create(null)), this._events[o] ? (this._events[o].fn ? (this._events[o] = [this._events[o], i]) : this._events[o].push(i)) : (this._events[o] = i), this;
            }),
            (i.prototype.removeListener = function (e, t, n, r) {
                var i = a ? a + e : e;
                if (!this._events || !this._events[i]) return this;
                var o = this._events[i],
                    s = [];
                if (t)
                    if (o.fn) (o.fn !== t || (r && !o.once) || (n && o.context !== n)) && s.push(o);
                    else for (var u = 0, c = o.length; c > u; u++) (o[u].fn !== t || (r && !o[u].once) || (n && o[u].context !== n)) && s.push(o[u]);
                return s.length ? (this._events[i] = 1 === s.length ? s[0] : s) : delete this._events[i], this;
            }),
            (i.prototype.removeAllListeners = function (e) {
                return this._events ? (e ? delete this._events[a ? a + e : e] : (this._events = a ? {} : Object.create(null)), this) : this;
            }),
            (i.prototype.off = i.prototype.removeListener),
            (i.prototype.addListener = i.prototype.on),
            (i.prototype.setMaxListeners = function () {
                return this;
            }),
            (i.prefixed = a),
            (e.exports = i);
    },
    function (e, t) {
        "use strict";
        function n(e) {
            if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e);
        }
        function r(e) {
            var t = Object.getOwnPropertyNames(e);
            return (
                Object.getOwnPropertySymbols && (t = t.concat(Object.getOwnPropertySymbols(e))),
                t.filter(function (t) {
                    return i.call(e, t);
                })
            );
        }
        var i = Object.prototype.propertyIsEnumerable;
        e.exports =
            Object.assign ||
            function (e, t) {
                for (var i, a, o = n(e), s = 1; s < arguments.length; s++) {
                    (i = arguments[s]), (a = r(Object(i)));
                    for (var u = 0; u < a.length; u++) o[a[u]] = i[a[u]];
                }
                return o;
            };
    },
    function (e, t) {
        e.exports = socket;
    },
    function (e, t) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = (function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                    }
                }
                return function (t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            })(),
            i = (function () {
                function e(t, r) {
                    n(this, e), (this.view = t), (this.limit = r);
                }
                return (
                    r(e, [
                        { key: "dispose", value: function () {} },
                        {
                            key: "updateStream",
                            value: function (e) {
                                var t = e.channel.name;
                                "offline" === e.status ? this.view.remove(t, e) : this.view.hasStream(t) ? this.view.update(t, e) : !this.view.hasStream(t) && this.view.getStreamCount() < this.limit && this.view.add(t, e);
                            },
                        },
                    ]),
                    e
                );
            })();
        (t["default"] = i), (e.exports = t["default"]);
    },
]);

