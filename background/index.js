/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = Log;
/* harmony export (immutable) */ __webpack_exports__["e"] = Error;
/* harmony export (immutable) */ __webpack_exports__["l"] = getCurrentTab;
/* harmony export (immutable) */ __webpack_exports__["j"] = getActiveTabById;
/* harmony export (immutable) */ __webpack_exports__["k"] = getActiveTabs;
/* harmony export (immutable) */ __webpack_exports__["m"] = normalizedURL;
const IS_PROD = false;
/* harmony export (immutable) */ __webpack_exports__["g"] = IS_PROD;


function Log(message) {
  if (!IS_PROD) {
    console.log(message); // eslint-disable-line no-console
  }
}

function Error(message) {
  if (!IS_PROD) {
    console.error(message); // eslint-disable-line no-console
  }
}

const DEFAULT_API_SERVER = IS_PROD ? 'https://ff.lzr.io' : 'https://ff-dev.lzr.io';
const DEFAULT_WEB_SERVER = IS_PROD ? 'https://feed.laserlike.com' : 'http://localhost:3000';

const COOKIE_URL_PROD = 'https://laserlike.com';
const COOKIE_URL_LOCAL = 'http://localhost:3000';
const COOKIE_URL = IS_PROD ? COOKIE_URL_PROD : COOKIE_URL_LOCAL;
/* harmony export (immutable) */ __webpack_exports__["d"] = COOKIE_URL;

const COOKIE_DOMAIN = IS_PROD ? '.laserlike.com' : undefined;
/* harmony export (immutable) */ __webpack_exports__["b"] = COOKIE_DOMAIN;
  // domain 'localhost' does not work, so make it undefined

const COOKIE_NAMES = {
  apiServer: 'api_server_url',
  webServer: 'web_server_url',
  extensionOrigin: 'extension_origin',
  userID: 'user_id',
  token: 'token',
  compactMode: 'compact_mode',
  paused: 'paused',
  userDisplayName: 'user_display_name',
  accountDeleted: 'account_deleted',
  newTabUrl: 'new_tab_url',
}
/* harmony export (immutable) */ __webpack_exports__["c"] = COOKIE_NAMES;

const FORYOU_FEED_URL = 'FOR_YOU';
/* harmony export (immutable) */ __webpack_exports__["f"] = FORYOU_FEED_URL;


const state = {
  myWindowId: null,
  paused: false,
  userId: 0,
  authToken: '',
  isLoggingIn: false,
  compactMode: true,
  accountDeleted: false,
  newTabUrl: undefined,

  API_SERVER: DEFAULT_API_SERVER,
  WEB_SERVER: DEFAULT_WEB_SERVER,

  activeTabs: {}, // key: windowId: number, value: {tabId: number, url: string}
};
/* harmony export (immutable) */ __webpack_exports__["n"] = state;


const URLs = {
  // account management
  get login() { return `${state.API_SERVER}/auth/api/v1/login`; },
  get updateEmail() { return `${state.API_SERVER}/auth/api/v1/update-email`; },
  get emailValidate() { return `${state.API_SERVER}/auth/api/v1/email/validate`; },
  get sendVerification() { return `${state.API_SERVER}/auth/api/v1/email/sendverification?verification_method=2`},
  get deleteAccount() { return `${state.API_SERVER}/auth/api/v1/delete-account`; },
  get preferences() { return `${state.API_SERVER}/auth/api/v1/user/preferences`; },
  get managePreferences() { return `${state.API_SERVER}/auth/api/v1/user/manage-preferences`; },

  get log() { return `${state.API_SERVER}/logging/api/v1/log`; },
  get trendfeed() { return `${state.API_SERVER}/searchlike/api/v1/trendfeed`; },
  get related() { return `${state.API_SERVER}/searchlike/api/v1/related`; },
  get profile() { return `${state.API_SERVER}/searchlike/api/v1/profile`; },
  get getProfile() { return `${state.API_SERVER}/searchlike/api/v1/get_profile`; },

  get defaultTab() { return `${state.WEB_SERVER}/`; },
};
/* harmony export (immutable) */ __webpack_exports__["i"] = URLs;


const CLIENT_INFO = { 'product_enum': 'TrendsAndFriends', 'os_type': 'extension' };
/* harmony export (immutable) */ __webpack_exports__["a"] = CLIENT_INFO;


// active relative to the current window
function getCurrentTab() {
  let params = { currentWindow: true, active: true };
  return browser.tabs.query(params).then(tabs => { // eslint-disable-line no-undef
    if (!tabs || tabs.length < 1) {
      return undefined;
    }
    return tabs[0];
  });
}

function getActiveTabById(tabId) {
  let params = { active: true };
  return browser.tabs.query(params).then(tabs => { // eslint-disable-line no-undef
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].id === tabId) {
        return tabs[i];
      }
    }

    return undefined;
  });
}

function getActiveTabs() {
  let params = { active: true };
  return browser.tabs.query(params).then(tabs => { // eslint-disable-line no-undef
    if (!tabs || tabs.length < 1) {
      Log('newContent: no tabs!');
      return [];
    }
    return tabs;
  });
}

function normalizedURL(url) {
  if (!url) {
    return '';
  }
  url = url.split('#')[0];
  const readerPrefix = 'about:reader?url=';
  if (url.startsWith(readerPrefix)) {
    url = decodeURIComponent(url.slice(readerPrefix.length));
  }
  else if (url.startsWith('about:') || url === '') {
    url = FORYOU_FEED_URL;
  }
  return url;
}


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = LRUCache

// This will be a proper iterable 'Map' in engines that support it,
// or a fakey-fake PseudoMap in older versions.
var Map = __webpack_require__(6)
var util = __webpack_require__(8)

// A linked list to keep track of recently-used-ness
var Yallist = __webpack_require__(11)

// use symbols if possible, otherwise just _props
var hasSymbol = typeof Symbol === 'function'
var makeSymbol
if (hasSymbol) {
  makeSymbol = function (key) {
    return Symbol.for(key)
  }
} else {
  makeSymbol = function (key) {
    return '_' + key
  }
}

var MAX = makeSymbol('max')
var LENGTH = makeSymbol('length')
var LENGTH_CALCULATOR = makeSymbol('lengthCalculator')
var ALLOW_STALE = makeSymbol('allowStale')
var MAX_AGE = makeSymbol('maxAge')
var DISPOSE = makeSymbol('dispose')
var NO_DISPOSE_ON_SET = makeSymbol('noDisposeOnSet')
var LRU_LIST = makeSymbol('lruList')
var CACHE = makeSymbol('cache')

function naiveLength () { return 1 }

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
function LRUCache (options) {
  if (!(this instanceof LRUCache)) {
    return new LRUCache(options)
  }

  if (typeof options === 'number') {
    options = { max: options }
  }

  if (!options) {
    options = {}
  }

  var max = this[MAX] = options.max
  // Kind of weird to have a default max of Infinity, but oh well.
  if (!max ||
      !(typeof max === 'number') ||
      max <= 0) {
    this[MAX] = Infinity
  }

  var lc = options.length || naiveLength
  if (typeof lc !== 'function') {
    lc = naiveLength
  }
  this[LENGTH_CALCULATOR] = lc

  this[ALLOW_STALE] = options.stale || false
  this[MAX_AGE] = options.maxAge || 0
  this[DISPOSE] = options.dispose
  this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
  this.reset()
}

// resize the cache when the max changes.
Object.defineProperty(LRUCache.prototype, 'max', {
  set: function (mL) {
    if (!mL || !(typeof mL === 'number') || mL <= 0) {
      mL = Infinity
    }
    this[MAX] = mL
    trim(this)
  },
  get: function () {
    return this[MAX]
  },
  enumerable: true
})

Object.defineProperty(LRUCache.prototype, 'allowStale', {
  set: function (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  },
  get: function () {
    return this[ALLOW_STALE]
  },
  enumerable: true
})

Object.defineProperty(LRUCache.prototype, 'maxAge', {
  set: function (mA) {
    if (!mA || !(typeof mA === 'number') || mA < 0) {
      mA = 0
    }
    this[MAX_AGE] = mA
    trim(this)
  },
  get: function () {
    return this[MAX_AGE]
  },
  enumerable: true
})

// resize the cache when the lengthCalculator changes.
Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
  set: function (lC) {
    if (typeof lC !== 'function') {
      lC = naiveLength
    }
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(function (hit) {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      }, this)
    }
    trim(this)
  },
  get: function () { return this[LENGTH_CALCULATOR] },
  enumerable: true
})

Object.defineProperty(LRUCache.prototype, 'length', {
  get: function () { return this[LENGTH] },
  enumerable: true
})

Object.defineProperty(LRUCache.prototype, 'itemCount', {
  get: function () { return this[LRU_LIST].length },
  enumerable: true
})

LRUCache.prototype.rforEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this[LRU_LIST].tail; walker !== null;) {
    var prev = walker.prev
    forEachStep(this, fn, walker, thisp)
    walker = prev
  }
}

function forEachStep (self, fn, node, thisp) {
  var hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE]) {
      hit = undefined
    }
  }
  if (hit) {
    fn.call(thisp, hit.value, hit.key, self)
  }
}

LRUCache.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this[LRU_LIST].head; walker !== null;) {
    var next = walker.next
    forEachStep(this, fn, walker, thisp)
    walker = next
  }
}

LRUCache.prototype.keys = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.key
  }, this)
}

LRUCache.prototype.values = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.value
  }, this)
}

LRUCache.prototype.reset = function () {
  if (this[DISPOSE] &&
      this[LRU_LIST] &&
      this[LRU_LIST].length) {
    this[LRU_LIST].forEach(function (hit) {
      this[DISPOSE](hit.key, hit.value)
    }, this)
  }

  this[CACHE] = new Map() // hash of items by key
  this[LRU_LIST] = new Yallist() // list of items in order of use recency
  this[LENGTH] = 0 // length of items in the list
}

LRUCache.prototype.dump = function () {
  return this[LRU_LIST].map(function (hit) {
    if (!isStale(this, hit)) {
      return {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }
    }
  }, this).toArray().filter(function (h) {
    return h
  })
}

LRUCache.prototype.dumpLru = function () {
  return this[LRU_LIST]
}

LRUCache.prototype.inspect = function (n, opts) {
  var str = 'LRUCache {'
  var extras = false

  var as = this[ALLOW_STALE]
  if (as) {
    str += '\n  allowStale: true'
    extras = true
  }

  var max = this[MAX]
  if (max && max !== Infinity) {
    if (extras) {
      str += ','
    }
    str += '\n  max: ' + util.inspect(max, opts)
    extras = true
  }

  var maxAge = this[MAX_AGE]
  if (maxAge) {
    if (extras) {
      str += ','
    }
    str += '\n  maxAge: ' + util.inspect(maxAge, opts)
    extras = true
  }

  var lc = this[LENGTH_CALCULATOR]
  if (lc && lc !== naiveLength) {
    if (extras) {
      str += ','
    }
    str += '\n  length: ' + util.inspect(this[LENGTH], opts)
    extras = true
  }

  var didFirst = false
  this[LRU_LIST].forEach(function (item) {
    if (didFirst) {
      str += ',\n  '
    } else {
      if (extras) {
        str += ',\n'
      }
      didFirst = true
      str += '\n  '
    }
    var key = util.inspect(item.key).split('\n').join('\n  ')
    var val = { value: item.value }
    if (item.maxAge !== maxAge) {
      val.maxAge = item.maxAge
    }
    if (lc !== naiveLength) {
      val.length = item.length
    }
    if (isStale(this, item)) {
      val.stale = true
    }

    val = util.inspect(val, opts).split('\n').join('\n  ')
    str += key + ' => ' + val
  })

  if (didFirst || extras) {
    str += '\n'
  }
  str += '}'

  return str
}

LRUCache.prototype.set = function (key, value, maxAge) {
  maxAge = maxAge || this[MAX_AGE]

  var now = maxAge ? Date.now() : 0
  var len = this[LENGTH_CALCULATOR](value, key)

  if (this[CACHE].has(key)) {
    if (len > this[MAX]) {
      del(this, this[CACHE].get(key))
      return false
    }

    var node = this[CACHE].get(key)
    var item = node.value

    // dispose of the old one before overwriting
    // split out into 2 ifs for better coverage tracking
    if (this[DISPOSE]) {
      if (!this[NO_DISPOSE_ON_SET]) {
        this[DISPOSE](key, item.value)
      }
    }

    item.now = now
    item.maxAge = maxAge
    item.value = value
    this[LENGTH] += len - item.length
    item.length = len
    this.get(key)
    trim(this)
    return true
  }

  var hit = new Entry(key, value, len, now, maxAge)

  // oversized objects fall out of cache automatically.
  if (hit.length > this[MAX]) {
    if (this[DISPOSE]) {
      this[DISPOSE](key, value)
    }
    return false
  }

  this[LENGTH] += hit.length
  this[LRU_LIST].unshift(hit)
  this[CACHE].set(key, this[LRU_LIST].head)
  trim(this)
  return true
}

LRUCache.prototype.has = function (key) {
  if (!this[CACHE].has(key)) return false
  var hit = this[CACHE].get(key).value
  if (isStale(this, hit)) {
    return false
  }
  return true
}

LRUCache.prototype.get = function (key) {
  return get(this, key, true)
}

LRUCache.prototype.peek = function (key) {
  return get(this, key, false)
}

LRUCache.prototype.pop = function () {
  var node = this[LRU_LIST].tail
  if (!node) return null
  del(this, node)
  return node.value
}

LRUCache.prototype.del = function (key) {
  del(this, this[CACHE].get(key))
}

LRUCache.prototype.load = function (arr) {
  // reset the cache
  this.reset()

  var now = Date.now()
  // A previous serialized cache has the most recent items first
  for (var l = arr.length - 1; l >= 0; l--) {
    var hit = arr[l]
    var expiresAt = hit.e || 0
    if (expiresAt === 0) {
      // the item was created without expiration in a non aged cache
      this.set(hit.k, hit.v)
    } else {
      var maxAge = expiresAt - now
      // dont add already expired items
      if (maxAge > 0) {
        this.set(hit.k, hit.v, maxAge)
      }
    }
  }
}

LRUCache.prototype.prune = function () {
  var self = this
  this[CACHE].forEach(function (value, key) {
    get(self, key, false)
  })
}

function get (self, key, doUse) {
  var node = self[CACHE].get(key)
  if (node) {
    var hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE]) hit = undefined
    } else {
      if (doUse) {
        self[LRU_LIST].unshiftNode(node)
      }
    }
    if (hit) hit = hit.value
  }
  return hit
}

function isStale (self, hit) {
  if (!hit || (!hit.maxAge && !self[MAX_AGE])) {
    return false
  }
  var stale = false
  var diff = Date.now() - hit.now
  if (hit.maxAge) {
    stale = diff > hit.maxAge
  } else {
    stale = self[MAX_AGE] && (diff > self[MAX_AGE])
  }
  return stale
}

function trim (self) {
  if (self[LENGTH] > self[MAX]) {
    for (var walker = self[LRU_LIST].tail;
         self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      var prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

function del (self, node) {
  if (node) {
    var hit = node.value
    if (self[DISPOSE]) {
      self[DISPOSE](hit.key, hit.value)
    }
    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

// classy, since V8 prefers predictable objects.
function Entry (key, value, length, now, maxAge) {
  this.key = key
  this.value = value
  this.length = length
  this.now = now
  this.maxAge = maxAge || 0
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feed__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__network__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logging__ = __webpack_require__(13);






/*
Update content when a new tab becomes active.
*/
browser.tabs.onActivated.addListener(tabsOnActivated);

/*
Update content when a new page is loaded into a tab.
*/
browser.tabs.onUpdated.addListener(tabsOnUpdated);

/*
replace default tab to https://feed.laserlike.com/firefox
*/
browser.tabs.onCreated.addListener(tabsOnCreated);

/*
Update cookies if got changed
*/
browser.cookies.onChanged.addListener(cookieChanged);

browser.runtime.onMessage.addListener(onMessage);

window.onload = fetchTokenAndUserId;

function onMessage(message) {
  if (message.method == 'iframeActive') {
    if (message.uiElement == '/toolbar' && Object(__WEBPACK_IMPORTED_MODULE_0__common__["m" /* normalizedURL */])(message.url) == __WEBPACK_IMPORTED_MODULE_0__common__["f" /* FORYOU_FEED_URL */]) {
      lastForYouBadgeClickSeconds = Date.now() / 1000;
    }
    relatedChanged(message.windowId, message.url, true);
    Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__feed__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_0__common__["f" /* FORYOU_FEED_URL */])).then(feed => feed.broadcast());
    Object(__WEBPACK_IMPORTED_MODULE_3__logging__["a" /* logOpenView */])(message.uiElement, message.url);
  }
  else if (message.method == 'read') {
    const url = message.card.orig_url || message.card.url;
    __WEBPACK_IMPORTED_MODULE_3__logging__["c" /* readCache */].set(url, {
      url: message.url,
      card: message.card,
      uiElement: message.uiElement,
      length: JSON.stringify(message.card).length + message.uiElement.length,
    });
    browser.tabs.create({ url: url });
  }
  return;
}

function tabsOnActivated(activeInfo) {
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(activeInfo);
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`BG$ activated a new tab: (${activeInfo.windowId}, ${activeInfo.tabId})`);
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["j" /* getActiveTabById */])(activeInfo.tabId).then(tab => {
    const existing = __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].activeTabs[activeInfo.windowId];
    if (!existing) {
      // totally new window, create a dummy so that relatedChanged() can have a good time
      __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].activeTabs[activeInfo.windowId] = { tabId: activeInfo.tabId, url: '' };
    }
    relatedChanged(activeInfo.windowId, tab.url);
  })
}

function tabsOnUpdated(tabId, changeInfo) {
  if (!changeInfo.url) {
    return;
  }
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`BG$ update tab ${tabId}: ${changeInfo.url}`);

  if (changeInfo.url === 'about:newtab' && !!__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].newTabUrl) {
    const updateProperties = {
      loadReplace: true,
      url: __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].newTabUrl,
    }
    var updating = browser.tabs.update(
      tabId,               // optional integer
      updateProperties      // object
    )

    updating.then(Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('update to laserlike done'));
  }
  else {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["j" /* getActiveTabById */])(tabId).then(tab => {
      relatedChanged(tab.windowId, changeInfo.url);
    });
  }
}

function tabsOnCreated(tab) {
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`got new tab: ${tab.url}`);
  if (!!__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].newTabUrl && tab.url === 'about:newtab') {
    const updateProperties = {
      loadReplace: true,
      url: __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].newTabUrl,
    }
    var updating = browser.tabs.update(
      tab.id,               // optional integer
      updateProperties      // object
    )

    updating.then(Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('set default to laserlike done'));
  }
}

function relatedChanged(windowId, url, force = false) {
  if (__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].paused || __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted) {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`BG$ extension disabled ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].paused} ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted}`)
    return;
  }

  const nurl = Object(__WEBPACK_IMPORTED_MODULE_0__common__["m" /* normalizedURL */])(url);
  const existing = __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].activeTabs[windowId];
  if (!existing) {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["e" /* Error */])('Internal error, should never happend!');
    return;
  }

  if (existing.url === nurl && !force) {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`BG$ same url: ${nurl}`);
    return;
  }

  __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].activeTabs[windowId] = { tabId: existing.tabId, url: nurl };

  Object(__WEBPACK_IMPORTED_MODULE_3__logging__["b" /* logRead */])(url);
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`BG$ fetch related feed in window ${windowId} to: ${url}`);
  let feedOrPromise = __WEBPACK_IMPORTED_MODULE_1__feed__["a" /* default */].get(nurl);
  if (Promise.resolve(feedOrPromise) != feedOrPromise) {
    let feed = feedOrPromise;
    feed.broadcast();
    updateBadge(feed.count, nurl);
  }
  else {
    updateBadge(0, nurl);
    let promise = feedOrPromise;
    promise.then(feed => {
      if (feed.url === __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].activeTabs[windowId].url) {
        updateBadge(feed.count, nurl);
      }
    })
  }
}

var lastForYouBadgeClickSeconds;

function updateBadge(count, url) {
  if (!count) {
    browser.browserAction.setBadgeText({ text: '' });
    return;
  }
  let color = 'green';
  let text = count.toString();
  if (url == __WEBPACK_IMPORTED_MODULE_0__common__["f" /* FORYOU_FEED_URL */]) {
    let now = Date.now() / 1000;
    if (lastForYouBadgeClickSeconds && now - lastForYouBadgeClickSeconds < 8 * 60 * 60) {
      // Show the badge at most once every 8 hours.
      text = '';
    }
    color = 'red';
  }
  browser.browserAction.setBadgeText({ text: text });
  browser.browserAction.setBadgeBackgroundColor({ color: color });
}

function setCookie(name, value, expirationDate = 2147483647) {
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`setcookie: ${name}, ${value}`);
  // According to http://promincproductions.com/blog/set-cookie-expiration-date-browser-compatiability/,
  // 2^31 - 1 is the max expiration date for cookies.
  let cookie = {
    url: __WEBPACK_IMPORTED_MODULE_0__common__["d" /* COOKIE_URL */],
    name: name,
    value: value
  };
  if (__WEBPACK_IMPORTED_MODULE_0__common__["b" /* COOKIE_DOMAIN */]) {
    cookie.domain = __WEBPACK_IMPORTED_MODULE_0__common__["b" /* COOKIE_DOMAIN */]
  }
  if (expirationDate != 0) {
    cookie.expirationDate = expirationDate;
  }
  browser.cookies.set(cookie);
}

/*
Cookie changed callback
*/
function cookieChanged(changeInfo) {
  const cookie = changeInfo.cookie;
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`cookie changed: ${JSON.stringify(changeInfo)}`);
  if (cookie && (cookie.domain === __WEBPACK_IMPORTED_MODULE_0__common__["b" /* COOKIE_DOMAIN */] || cookie.domain === 'localhost')) {
    if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].apiServer) {
      __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].API_SERVER = cookie.value;
    }
    else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].webServer) {
      __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].WEB_SERVER = cookie.value;
    }
    else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].paused) {
      __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].puased = cookie.value;
      if (changeInfo.removed) {
        __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].paused = false;
      }
    }
    else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].userID) {
      __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId = cookie.value;
      if (changeInfo.removed) {
        __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId = undefined;
      }
    }
    else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].token) {
      if (changeInfo.removed) {
        __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken = undefined;

        // relogin
        setTimeout(()=> {
          tryLogin();
        }, 200);
      }
      else {
        __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken = cookie.value;
      }
    }
    else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].accountDeleted) {
      if (changeInfo.removed) {
        __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted = false;
      }
      else {
        __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted = (cookie.value === 'true') ? true : false;
      }
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`account deleted status: ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted}`);
      if (!__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted) {
        tryLogin();
      }
      else {
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('send log out message');
        browser.runtime.sendMessage({ method: 'loggedOut' });
      }
    }
    else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].newTabUrl) {
      if (changeInfo.removed) {
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('unset laserlike from home page')
        __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].newTabUrl = undefined;
      }
      else {
        __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].newTabUrl = cookie.value;
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`set home to: ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].newTabUrl}`);
      }

      // update the sidebar about this change
      browser.runtime.sendMessage({ method: 'homePageChanged' });
    }
  }
}

/*
Try to get the saved userId and token. if not found,
then try login again
*/
function fetchTokenAndUserId() {
  if (!!__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId && !!__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken) {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`has in-memory userId: ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId} token: ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken}`);
    return
  }

  //get all cookies in the domain
  let gettingAllCookies = browser.cookies.getAll({ url: __WEBPACK_IMPORTED_MODULE_0__common__["d" /* COOKIE_URL */] });
  gettingAllCookies.then((cookies) => {
    if (cookies.length > 0) {
      //add an <li> item with the name and value of the cookie to the list
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`got ${cookies.length} cookies`);
      for (let cookie of cookies) {
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(JSON.stringify(cookie));
        if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].userID) {
          __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId = cookie.value;
        }
        else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].token) {
          __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken = cookie.value;
        }
        else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].apiServer) {
          __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].API_SERVER = cookie.value;
        }
        else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].webServer) {
          __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].WEB_SERVER = cookie.value;
        }
        else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].paused) {
          __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].paused = (cookie.value === 'true') ? true : false;
        }
        else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].accountDeleted) {
          __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted = (cookie.value === 'true') ? true : false;
        }
        else if (cookie.name === __WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].newTabUrl) {
          __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].newTabUrl = cookie.value;
        }
      }

      setCookie(__WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].apiServer, __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].API_SERVER);
      setCookie(__WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].webServer, __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].WEB_SERVER);
    }
    else {
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('no cookies found!');
      setCookie(__WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].apiServer, __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].API_SERVER);
      setCookie(__WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].webServer, __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].WEB_SERVER);
    }

    setCookie(__WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].extensionOrigin, browser.extension.getURL('/').slice(0, -1), 0);

    if (!__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted) {
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('account not deleted');
      if (!__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken || !__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId) {
        tryLogin();
      }
      else {
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`got saved userId: ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId} token: ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken} from cookie store`);
        authTokenChanged();
      }
    }
    else {
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('account is deleted');
    }

  });
}

/*
try to login and save the token and user id
*/
function tryLogin(count = 0) {
  if (__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].isLoggingIn) {
    return;
  }

  // could be changed by some other?
  if (__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken && __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId) {
    return;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted) {
    return;
  }

  Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('login in....');

  __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].isLoggingIn = true;

  const success = (userId, authToken) => {
    __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].isLoggingIn = false;

    // save for local use now
    __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId = userId;
    __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken = authToken;
    setCookie(__WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].userID, __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId);
    setCookie(__WEBPACK_IMPORTED_MODULE_0__common__["c" /* COOKIE_NAMES */].token, __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken);

    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`login response: user id: ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId} and token: ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken}`);

    // sometimes the iframe don't get the cookie, use a timer to delay the message
    setTimeout(() => {
      // tell the sidebar/toolbar that we are logged in. They are supposed to switch to the forYou feed
      browser.runtime.sendMessage({ method: 'loggedIn' });

      authTokenChanged();
    }, 100);

    Object(__WEBPACK_IMPORTED_MODULE_3__logging__["d" /* uploadHistory */])();
  }

  const failure = (status, error) => {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["e" /* Error */])(`login failed: ${status}, ${error}`);
    __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].isLoggingIn = false;

    if (count > 22) {
      // stop the retry after one day, we probably shutdown the service
      return;
    }

    count *= 2;
    if (count < 1) { count = 1; }
    const maxTimeoutSeconds = 2 * 60 * 60 * 1000;   // two hours then stop the increase
    let timeoutSeconds = 1000 * count;
    if (timeoutSeconds > maxTimeoutSeconds) {
      timeoutSeconds = maxTimeoutSeconds;
    }
    setTimeout(() => {
      if (!__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].accountDeleted) {
        tryLogin(count);
      }
    }, timeoutSeconds);
  }

  __WEBPACK_IMPORTED_MODULE_2__network__["a" /* default */].login(success, failure);
}

function authTokenChanged() {
  __WEBPACK_IMPORTED_MODULE_1__feed__["a" /* default */].clear();
  __WEBPACK_IMPORTED_MODULE_1__feed__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_0__common__["f" /* FORYOU_FEED_URL */]);
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["k" /* getActiveTabs */])().then(tabs => {
    __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].activeTabs = {};
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`got ${tabs.length} active tabs`);
    tabs.forEach(tab => {
      // create new object from each window
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(tab);
      __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].activeTabs[tab.windowId] = { tabId: tab.id, url: '' };
      relatedChanged(tab.windowId, tab.url, true);
    });
  });
}

/*
 browser content menu related code
 */
const searchLaserlikeId = 'searchLaserlikeId';

browser.menus.create({
  id: searchLaserlikeId,
  title: 'Search Laserlike for related',
  contexts: ['selection', 'link']
});

browser.menus.onClicked.addListener((info) => {
  function onCreated(tab) {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`Created new tab: ${tab.id}`)
  }

  function onError(error) {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`Error: ${error}`);
  }

  let text;
  if (info.menuItemId === searchLaserlikeId) {
    if (info.linkUrl) {
      text = `url=${encodeURIComponent(info.linkUrl)}`;
    }
    else {
      text = `q=${encodeURIComponent(info.selectionText)}`;
    }
    let creating = browser.tabs.create({
      url: `${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].WEB_SERVER}/search?${text}`
    });
    creating.then(onCreated, onError);
  }
});

browser.menus.onShown.addListener(() => {
  let title = 'Search Laserlike for related';
  browser.menus.update(searchLaserlikeId, { title: title });
  browser.menus.refresh();
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lru_cache__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lru_cache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lru_cache__);



const FORYOU_FEED_TTL_MILLIS = 5 * 60 * 1000;
const RELATED_FEED_TTL_MILLIS = 60 * 60 * 1000;
const SECONDS_IN_ONE_HOUR = 60 * 60;

const CACHE_MAX_LENGTH = 10 * 1000 * 1000;

/*
A Feed is just a list of cards with some other properties.

We fetch Foryou and Related feed for every new URL the user browsed and cache it locally.

- The number of articles in the active tab will be shown as badge.
- The badge is set to red color if the feed not read.
- If people opens the popup for more than five seconds, we then change the badge color to green.
- We refetch the related articles after one hour.
- If anything new shows up during refresh, we will show the new count and change color to red.
*/
class Feed {
  constructor(url, data) {
    data.cards = data.cards || [];
    this.url = url;
    this.count = data.count;
    this.fetchTime = Date.now();
    this.json = JSON.stringify(data.cards);
    this.ttl = data.ttl || 0;
  }

  expired() {
    if (this.url == __WEBPACK_IMPORTED_MODULE_0__common__["f" /* FORYOU_FEED_URL */]) {
      const ttl = Math.max(FORYOU_FEED_TTL_MILLIS, this.ttl);
      return Date.now() - this.fetchTime > ttl;
    }
    return Date.now() - this.fetchTime > RELATED_FEED_TTL_MILLIS;
  }

  broadcast() {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`broadcasting url ${this.url}`);
    browser.runtime.sendMessage(this.toMessage());
  }

  toMessage() {
    return {
      method: 'feed',
      url: this.url,
      count: this.count,
      json: this.json,
    };
  }

  length() {
    return this.json.length + this.url.length;
  }
}

// FeedCache is an LRU cache that stores at most 10MB of data and at most 10k items.
class FeedCache {
  constructor() {
    this.cache = __WEBPACK_IMPORTED_MODULE_1_lru_cache___default()({
      max: CACHE_MAX_LENGTH,
      length: (value, key) => value.length() + key.length,
    });
    this.fetchPromises = __WEBPACK_IMPORTED_MODULE_1_lru_cache___default()({
      max: 100,
      maxAge: 60 * 1000, // 1 minute.
    });
  }

  clear() {
    this.cache.reset();
    this.fetchPromises.reset();
  }

  get(url) {
    if (__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].paused) {
      return new Feed(url, {});
    }
    let feed = this.cache.get(url);
    const shouldFetch = !feed || (feed && feed.expired());
    let fetchPromise = this.fetchPromises.get(url);
    if (!fetchPromise && shouldFetch) {
      fetchPromise = this.fetchFeed(url);
      this.fetchPromises.set(url, fetchPromise);
    }
    if (feed) {
      return feed;
    }
    return fetchPromise;
  }

  set(url, data) {
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`saving feed ${url}`);
    let feed = new Feed(url, data);
    // Keep for you feed on top of the cache so it's not dropped by the set below.
    this.cache.get(__WEBPACK_IMPORTED_MODULE_0__common__["f" /* FORYOU_FEED_URL */]);
    this.cache.set(url, feed);
    feed.broadcast();
    return feed;
  }

  fetchFeed(url, retryCount = 1) {
    if (__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].paused) {
      return Promise.resolve(new Feed(url, {}));
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`fetching ${url}`);
    let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken}` });
    let request;
    if (url == __WEBPACK_IMPORTED_MODULE_0__common__["f" /* FORYOU_FEED_URL */]) {
      let fetchCmd = {
        method: 'POST',
        body: JSON.stringify({
          'client_info': __WEBPACK_IMPORTED_MODULE_0__common__["a" /* CLIENT_INFO */],
          'tf_trend': { 'key': { 'type': 2 } }, 'last_card_pos': '0'
        }),
        headers: headers,
      };
      request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].trendfeed, fetchCmd);
      retryCount = 0;
    }
    else {
      let fetchCmd = {
        method: 'POST',
        body: JSON.stringify({
          'client_info': __WEBPACK_IMPORTED_MODULE_0__common__["a" /* CLIENT_INFO */],
          'search_like': { 'vibe': [{ 'target': { 'target': `u:${url}` } }] }
        }),
        headers: headers,
      }
      request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].related, fetchCmd);
    }
    return fetch(request).then(response => {
      return response.json().then(json => {
        let data = {
          cards: json['cards'] || [],
          ttl: (json['ttl'] || 0) * 1000,
        }
        data.cards = data.cards.filter(c => !!c.article);
        if (url != __WEBPACK_IMPORTED_MODULE_0__common__["f" /* FORYOU_FEED_URL */]) {
          data.count = (json['search_like'] || {})['num_results_to_show_first'] || data.cards.length;
          data.count = Math.min(data.count, 4);
        } else {
          data.count = data.cards.length;
        }
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`got ${data.cards.length} new for you cards`);
        if (retryCount && data.ttl && data.ttl < SECONDS_IN_ONE_HOUR) {
          Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`retry in ${data.ttl} seconds`);
          setTimeout(() => this.fetchFeed(url, retryCount - 1), data.ttl);
        }
        return this.set(url, data);
      });
    });
  }
}

/*
 {string(url): Feed}, note that we strip out the URL fragments when using it as key
  this is because the crawler removes the fragments, so it makes no sense
  for us to use it either.
 */
var feedCache = new FeedCache();
/* harmony default export */ __webpack_exports__["a"] = (feedCache);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {if (process.env.npm_package_name === 'pseudomap' &&
    process.env.npm_lifecycle_script === 'test')
  process.env.TEST_PSEUDOMAP = 'true'

if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
  module.exports = Map
} else {
  module.exports = __webpack_require__(7)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = PseudoMap

function PseudoMap (set) {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'")

  this.clear()

  if (set) {
    if ((set instanceof PseudoMap) ||
        (typeof Map === 'function' && set instanceof Map))
      set.forEach(function (value, key) {
        this.set(key, value)
      }, this)
    else if (Array.isArray(set))
      set.forEach(function (kv) {
        this.set(kv[0], kv[1])
      }, this)
    else
      throw new TypeError('invalid argument')
  }
}

PseudoMap.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  Object.keys(this._data).forEach(function (k) {
    if (k !== 'size')
      fn.call(thisp, this._data[k].value, this._data[k].key)
  }, this)
}

PseudoMap.prototype.has = function (k) {
  return !!find(this._data, k)
}

PseudoMap.prototype.get = function (k) {
  var res = find(this._data, k)
  return res && res.value
}

PseudoMap.prototype.set = function (k, v) {
  set(this._data, k, v)
}

PseudoMap.prototype.delete = function (k) {
  var res = find(this._data, k)
  if (res) {
    delete this._data[res._index]
    this._data.size--
  }
}

PseudoMap.prototype.clear = function () {
  var data = Object.create(null)
  data.size = 0

  Object.defineProperty(this, '_data', {
    value: data,
    enumerable: false,
    configurable: true,
    writable: false
  })
}

Object.defineProperty(PseudoMap.prototype, 'size', {
  get: function () {
    return this._data.size
  },
  set: function (n) {},
  enumerable: true,
  configurable: true
})

PseudoMap.prototype.values =
PseudoMap.prototype.keys =
PseudoMap.prototype.entries = function () {
  throw new Error('iterators are not implemented in this version')
}

// Either identical, or both NaN
function same (a, b) {
  return a === b || a !== a && b !== b
}

function Entry (k, v, i) {
  this.key = k
  this.value = v
  this._index = i
}

function find (data, k) {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k))
      return data[key]
  }
}

function set (data, k, v) {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k)) {
      data[key].value = v
      return
    }
  }
  data.size++
  data[key] = new Entry(k, v, key)
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(9);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(10);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);


const EmailStatus = {
    DEFAULT: 0,
    FALSE: 1,
    CONFIRMED: 2
}

class NetworkRequest {
    constructor() {
        this.authToken = undefined;
    }

    // authToken: string;

    login(success, failure) {
      var loginJson = {
        'social_flag': 'firefox',
      };
      if (!__WEBPACK_IMPORTED_MODULE_0__common__["g" /* IS_PROD */]) {
        loginJson['oauth_token'] = 'laserlike-test-device-id';
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('login in as new test user ....');
      }
      else {
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('login in as new user ....');
      }

      let headers = new Headers({ 'Accept': 'application/json' });
      let loginRequest = { method: 'POST', body: JSON.stringify(loginJson), headers: headers };
      let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].login, loginRequest);

      return fetch(request)
        .then(response => {
          Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`login returned ${response.status}`);
          if (response.status === 200) {
            response.json().then(json => {
              if (json.user_id && json.auth_token) {
                success(json.user_id, json.auth_token);
              }
              else {
                failure(999, 'unknown response');
              }
            })
            .catch(error => {
              Object(__WEBPACK_IMPORTED_MODULE_0__common__["e" /* Error */])(`error login json parsing: ${error}`);
              failure(999, error);    // the call timedout or server not reachable
            })
          }
          else {
            failure(response.status);
          }
        })
        .catch(error => {
          failure(999, error);    // the call timedout or server not reachable
        });
    }

    // change this user account's email address
    updateUserEmail(email, success, failure) {
        var emailJson = {
            'email': email,
            'verification_method': 2,
        };

        let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
        let emailRequest = { method: 'POST', headers: headers, body: JSON.stringify(emailJson) };
        let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].updateEmail, emailRequest);

        return fetch(request)
          .then(response => {
            Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`update email returned ${response.status}`);

            if (response.status === 200) {
                success(email, false);
            }
            else {
                failure(response.status);
            }
        })
        .catch(error => {
            failure(999, error);    // the call timedout or server not reachable
        });
    }

    // called after user entered the code we sent to the email address
    validateUserEmail(userId, code, success, failure) {
      var validateJson = {
        'id': userId,
        'passcode': code,
      };

      let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
      let validateRequest = { method: 'POST', headers: headers, body: JSON.stringify(validateJson) };
      let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].emailValidate, validateRequest);

      return fetch(request)
        .then(response => {
          Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`validate code returned ${response.status}`);

          if (response.status === 200) {
              success();
          }
          else {
              failure(response.status);
          }
      })
      .catch(error => {
          failure(999, error);    // the call timedout or server not reachable
      });
    }

    // re-send the verification code to the email on the profile
    resendEmailVerification(success, failure) {
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('resend email verification');
      let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
      let fetchCmd = { method: 'GET', headers: headers };
      let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].sendVerification, fetchCmd);

      return fetch(request)
        .then(response => {
          if (response.status === 200) {
            success();
          }
          else {
            failure(response.status);
          }
        })
        .catch(error => {
          failure(999, error);
        });
    }

    // fetch the profile to get email stuff
    fetchUserProfile(success, failure) {
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('fetch user profile...');

      let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
      let fetchCmd = { method: 'GET', headers: headers };
      let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].getProfile, fetchCmd);

      return fetch(request)
        .then(response => {
          Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`fetch user profile result: ${response.status}`);

          if (response.status === 200) {
            response.json().then(json => {
              const emailConfirmed = (json['email_confirmed'] === EmailStatus.CONFIRMED);
              const userEmail = json['email'] || '';
              Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`email: ${userEmail}, confirmed: ${emailConfirmed}`);
              success(userEmail, emailConfirmed);
            })
            .catch(error => {
              failure(999, 'unknown response');
            })
          } else {
              failure(response.status);
          }
        })
        .catch(error => {
          failure(999, error);    // the call timedout or server not reachable
        });
    }

    // fetch the profile to get email digest preferences
    fetchUserPreferences(success, failure) {
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('fetch user preferences...');

      let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
      let fetchCmd = { method: 'GET', headers: headers };
      let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].preferences, fetchCmd);

      return fetch(request)
        .then(response => {
          Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`fetch user preferences result: ${response.status}`);

          if (response.status === 200) {
            response.json().then(json => {
              let subscribed = false;
              const emailPreferences = json['email_preferences'];
              if (emailPreferences) {
                const settings = emailPreferences['settings'];
                settings.forEach((setting)=> {
                  if (setting['type'] === 8) {
                    subscribed = setting['subscribed'];
                  }
                });
              }
              success(subscribed);
            })
            .catch(error => {
              failure(999, 'unknown response');
            })
          } else {
              failure(response.status);
          }
        })
        .catch(error => {
          failure(999, error);    // the call timedout or server not reachable
        });
    }

    manageUserPreferences(sendEmailDigest, success, failure) {
      var manageJson = {
        'email': {'unsubscription_map': {'EmailDigest' : sendEmailDigest ? 2 : 1}},
      };

      const headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
      const request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].managePreferences, { method: 'POST', headers: headers, body: JSON.stringify(manageJson), });

      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('updating user preferences....');

      return fetch(request)
        .then(response => {
          if (response.status === 200) {
            success();
          }
          else {
            failure(response.status);
          }
        })
        .catch(error => {
          Object(__WEBPACK_IMPORTED_MODULE_0__common__["e" /* Error */])(`updating user preferences error: ${error}`);
          failure(999, error);
        });

    }

    // this one wipes every trace of the user from our system!
    deleteAccount(success, failure) {
      const headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
      const request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].deleteAccount, { method: 'POST', headers: headers, body: '{}' });

      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('BG$ deleting account....');

      return fetch(request)
        .then(response => {
          if (response.status === 200) {
            success();
          }
          else {
            failure(response.status);
          }
        })
        .catch(error => {
          Object(__WEBPACK_IMPORTED_MODULE_0__common__["e" /* Error */])(`BG$ delete account error: ${error}`);
          failure(999, error);
        });
    }

    sendLog(userId, entries, response) {
        var logEntry = {
          'userID': userId,
          'entries': entries,
        };

        let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
        let log = { method: 'POST', headers: headers, body: JSON.stringify(logEntry) };
        let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].log, log);

        return fetch(request)
          .then(response => {
            Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`logging returned ${response.status}`);

            response(response);
          })
    }

    setUserDisplayName(name, response) {
        var names = {
          'name': name,
        };

        let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
        let namesRequest = { method: 'POST', headers: headers, body: JSON.stringify(names) };
        let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].profile, namesRequest);

        return fetch(request)
          .then(response => {
            Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`names returned ${response.status}`);

            response(response);
          })
    }

    fetchForYouFeed(success, failure) {
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])('fetching for your feed');

        let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
        let fetchCmd = { method: 'POST', body: '{"tf_trend":{"key":{"type":2}},"last_card_pos":"0"}', headers: headers };
        let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].trendfeed, fetchCmd);

        return fetch(request)
          .then(response => {
            Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`fetch for you returned ${response.status}`);

            if (response.status === 200) {
                response.json().then(json => {
                    var cards = json['cards'];
                    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`got ${cards ? cards.length : 0} new for you cards`);
                    if (cards) {
                        cards = cards.filter(c => c.article && c.article.image_url);
                    }

                    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`got ${cards ? cards.length : 0} new ForYou cards`);

                    success(cards);
                  });
            }
            else {
                failure(response.status);
            }
          })
          .catch(error => {
            Object(__WEBPACK_IMPORTED_MODULE_0__common__["e" /* Error */])(`${error}`);
            failure(999, error);
          });
    }

    fetchRelated(url, success, failure) {
        Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`fetching related cards: ${url}`);

        let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${this.authToken}` });
        let fetchCmd = { method: 'POST', body: `{"search_like": {"vibe": [{"target": {"target": "u:${url}"}}]}}`, headers: headers };
        let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].related, fetchCmd);

        return fetch(request)
          .then(response => {
            Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`fetch ${url} returned ${response.status}`);

            if (response.status === 200) {
                success(response);
            }
            else {
                failure(response.status);
            }
          })
          .catch(error => {
            Object(__WEBPACK_IMPORTED_MODULE_0__common__["e" /* Error */])(`${error}`);
            failure(999, error);
          });
    }

}

const networkRequest = new NetworkRequest();
/* harmony default export */ __webpack_exports__["a"] = (networkRequest);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = uploadHistory;
/* harmony export (immutable) */ __webpack_exports__["a"] = logOpenView;
/* harmony export (immutable) */ __webpack_exports__["b"] = logRead;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lru_cache__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lru_cache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lru_cache__);



const ONE_HOUR = 60 * 60 * 1000; /* ms */
const THREE_MONTH = 3 * 30 * 24 * ONE_HOUR;
const MAX_UPLOAD_HISTORY = 500; // lets upload the last 500

var isUploadingHistory = false;
var previousStartTime;// when we started reading
var previousUrl;      // the previous active url(not including about://), used in read logging

const readCache = __WEBPACK_IMPORTED_MODULE_1_lru_cache___default()({
  max: 1000 * 1000, // 1MB
  length: (value, key) => value.length + key.length,
});
/* harmony export (immutable) */ __webpack_exports__["c"] = readCache;


/*
upload history
*/
function uploadHistory() {
  if (isUploadingHistory) {
    return
  }
  // start over the active url logging since we
  // are going to load all anyways
  previousUrl = undefined;
  previousStartTime = undefined;
  isUploadingHistory = true;
  let options = { text: '', maxResults: MAX_UPLOAD_HISTORY };
  options['startTime'] = Date.now() - THREE_MONTH;
  Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`searching history since: ${options['startTime']}`);

  browser.history.search(options).then(items => {
    if (!items || items.length < 1) {
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["e" /* Error */])('returns no new history!');
      isUploadingHistory = false;
      return;
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`sending ${items.length} urls to the backend...`);
    let entries = [];
    items.forEach(item => {
      const startTime = (item.lastVisitTime || Date.now()) * 1000;
      const duration = (15 + (item.visitCount || 1)) * 1000 * 1000;
      const endTime = startTime + duration;

      entries.push({
        'eventType': 'start',
        'deviceTimeUnixMicros': startTime,
        'read': { 'cardURL': item.url, 'uiElement': 'history' },
      });
      entries.push({
        'eventType': 'end',
        'deviceTimeUnixMicros': endTime,
        'deviceDurationMicros': duration,
        'read': { 'cardURL': item.url, 'uiElement': 'history' },
      });
    });
    sendLog(entries).then(() => { isUploadingHistory = false; })
  });
}

function logOpenView(view, url) {
  const now = Date.now();
  const entry = {
    'deviceTimeUnixMicros': now * 1000,
    'openView': {
      'name': view,
      'url': url,
    },
  };
  sendLog([entry]);
}

/*
 update the read log:
 1. "end" reading the previous url if any
 2. update the fetch history timestamp
 3. "start" reading the new url
*/
function logRead(url) {
  if (url === previousUrl) {
    return
  }

  let now = Date.now();
  if (previousUrl && previousStartTime) {
    logReadEnd(previousUrl, previousStartTime);
  }

  previousUrl = url;
  previousStartTime = now;

  logReadStart(url);
}

function readData(url) {
  const read = {
    'cardURL': url,
    'uiElement': 'browser',
  }
  const data = readCache.get(url);
  if (data) {
    if (data.url) {
      read.query = `u:${data.url}`;
    }
    read.uiElement = data.uiElement;
    read.position = data.card.position;
    read.feed_type = data.card.feed_type;
    read.logging_tags = data.card.logging_tags;
  }
  return read;
}

function logReadStart(url) {
  const now = Date.now();
  const entry = {
    'eventType': 'start',
    'deviceTimeUnixMicros': now * 1000,
    'read': readData(url),
  };
  sendLog([entry]);
}

function logReadEnd(url, startTime) {
  const now = Date.now();
  const entry = {
    'eventType': 'end',
    'deviceTimeUnixMicros': now * 1000,
    'deviceDurationMicros': (now - startTime) * 1000,
    'read': readData(url),
  };
  sendLog([entry]);
}

function sendLog(entries) {
  if (__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].paused) {
    return;
  }
  let items = [];
  for (let i = 0; i < entries.length; i++) {
    items.push({
      'clientInfo': __WEBPACK_IMPORTED_MODULE_0__common__["a" /* CLIENT_INFO */],
      'userActivity': entries[i],
    });
  }
  const logEntry = {
    'userID': __WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].userId,
    'entries': items,
  };

  let headers = new Headers({ 'Accept': 'application/json', 'Authorization': `Token ${__WEBPACK_IMPORTED_MODULE_0__common__["n" /* state */].authToken}` });
  let log = { method: 'POST', headers: headers, body: JSON.stringify(logEntry) };
  let request = new Request(__WEBPACK_IMPORTED_MODULE_0__common__["i" /* URLs */].log, log);

  return fetch(request)
    .then(response => {
      Object(__WEBPACK_IMPORTED_MODULE_0__common__["h" /* Log */])(`logging returned ${response.status}`);
      return response.status == 200;
    })
}


/***/ })
/******/ ]);