var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var KeyBinding = function () {
    function KeyBinding(set$$1) {
        classCallCheck(this, KeyBinding);

        var v = [];
        set$$1.forEach(function (k) {
            if (k.match(/^[a-z]$/g)) {
                v.push(k.toUpperCase());
            } else {
                v.push(k);
            }
        });
        this.set = new Set(v);
    }

    createClass(KeyBinding, [{
        key: 'has',
        value: function has(v) {
            return this.set.has(v);
        }
    }, {
        key: 'tooltip',
        value: function tooltip() {
            var v = [];
            if (KeyBinding.isMac) {
                // in order
                if (this.has('Control')) {
                    v.push('⌃');
                }
                if (this.has('Alt')) {
                    v.push('⌥');
                }
                if (this.has('Shift')) {
                    v.push('⇧');
                }
                if (this.has('Meta')) {
                    v.push('⌘');
                }
                this.set.forEach(function (k) {
                    switch (k) {
                        case 'Control':
                        case 'Alt':
                        case 'Shift':
                        case 'Meta':
                            break;
                        case 'Home':
                            v.push('Home(Fn←)');
                            break;
                        case 'Enter':
                            v.push('↵');
                            break;
                        case 'Backspace':
                            v.push('Delete');
                            break;
                        case 'ArrowLeft':
                            v.push('←');
                            break;
                        case 'ArrowRight':
                            v.push('→');
                            break;
                        case 'ArrowUp':
                            v.push('↑');
                            break;
                        case 'ArrowDown':
                            v.push('↓');
                            break;
                        default:
                            if (k.match(/^[a-z]$/g)) {
                                v.push(k.toUpperCase());
                            } else {
                                v.push(k);
                            }
                            break;
                    }
                });
                return v.join('');
            } else {
                // in order
                if (this.has('Control')) {
                    v.push('Ctrl');
                }
                if (this.has('Alt')) {
                    v.push('Alt');
                }
                if (this.has('Shift')) {
                    v.push('Shift');
                }
                if (this.has('Meta')) {
                    v.push('Meta');
                }
                this.set.forEach(function (k) {
                    switch (k) {
                        case 'Control':
                        case 'Alt':
                        case 'Shift':
                        case 'Meta':
                            break;
                        case 'ArrowLeft':
                            v.push('←');
                            break;
                        case 'ArrowRight':
                            v.push('→');
                            break;
                        case 'ArrowUp':
                            v.push('↑');
                            break;
                        case 'ArrowDown':
                            v.push('↓');
                            break;
                        default:
                            if (k.match(/^[a-z]$/g)) {
                                v.push(k.toUpperCase());
                            } else {
                                v.push(k);
                            }
                            break;
                    }
                });
                return v.join('+');
            }
        }
    }, {
        key: 'size',
        get: function get$$1() {
            return this.set.size;
        }
    }], [{
        key: 'isMac',
        get: function get$$1() {
            return (/Mac/.test(window.navigator.platform)
            );
        }
    }]);
    return KeyBinding;
}();

// KeyMap -> string
var KeyMap = function () {
    function KeyMap(map) {
        var _this = this;

        classCallCheck(this, KeyMap);

        this.map = new Map(map);
        this.modifier = {
            ctrl: new WeakSet(),
            alt: new WeakSet(),
            shift: new WeakSet(),
            meta: new WeakSet()
        };
        this.map.forEach(function (_, k) {
            _this._addModifierRef(k);
        });
    }

    createClass(KeyMap, [{
        key: '_addModifierRef',
        value: function _addModifierRef(k) {
            if (k.has('Control') && k.size > 1) {
                this.modifier.ctrl.add(k);
            }
            if (k.has('Alt') && k.size > 1) {
                this.modifier.alt.add(k);
            }
            if (k.has('Shift') && k.size > 1) {
                this.modifier.shift.add(k);
            }
            if (k.has('Meta') && k.size > 1) {
                this.modifier.meta.add(k);
            }
        }
    }, {
        key: 'set',
        value: function set$$1(k, v) {
            this._addModifierRef(k);
            return this.map.set(k, v);
        }
    }, {
        key: 'match',
        value: function match(event) {
            var keySet = new Set(this.map.keys());
            var chordSize = 0;
            function filter(set$$1, b) {
                set$$1.forEach(function (k) {
                    if (!b.has(k)) {
                        set$$1.delete(k);
                    }
                });
            }
            if (event.ctrlKey) {
                filter(keySet, this.modifier.ctrl);
                chordSize += 1;
            }
            if (event.altKey) {
                filter(keySet, this.modifier.alt);
                chordSize += 1;
            }
            if (event.shiftKey) {
                filter(keySet, this.modifier.shift);
                chordSize += 1;
            }
            if (event.metaKey) {
                filter(keySet, this.modifier.meta);
                chordSize += 1;
            }
            if (keySet.size > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = keySet.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var key = _step.value;

                        if (key.size === chordSize + 1) {
                            // modifier + other key
                            switch (event.key) {
                                case 'Control':
                                case 'Alt':
                                case 'Shift':
                                case 'Meta':
                                    // ignore modifiers
                                    break;
                                default:
                                    {
                                        var v = event.key.match(/^[a-z]$/g) ? event.key.toUpperCase() : event.key;
                                        if (key.has(v)) {
                                            return this.map.get(key);
                                        }
                                    }}
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return null;
        }
    }], [{
        key: 'isAlphanumeric',
        value: function isAlphanumeric(event) {
            return !event.ctrlKey && !event.altKey && !event.metaKey && 48 <= event.which && event.which <= 57 || //0-9
            65 <= event.which && event.which <= 90 || //a-z
            !!event.key.match(/^[-_+=[{\]}\\|;:'",<.>/?`~]$/g);
        }
    }, {
        key: 'isInputMethod',
        value: function isInputMethod(event) {
            return event.which === 229;
        }
    }]);
    return KeyMap;
}();

export { KeyBinding, KeyMap };
