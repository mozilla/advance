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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = Log;
/* harmony export (immutable) */ __webpack_exports__["e"] = Error;
/* harmony export (immutable) */ __webpack_exports__["l"] = getCurrentTab;
/* harmony export (immutable) */ __webpack_exports__["j"] = getActiveTabById;
/* harmony export (immutable) */ __webpack_exports__["k"] = getActiveTabs;
/* harmony export (immutable) */ __webpack_exports__["m"] = normalizedURL;
const IS_PROD = true;
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

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initIframe;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(0);


function onFeed(message) {
  if (message.method === 'loggedIn' ||
    message.method === 'loggedOut' ||
    message.method === 'homePageChanged') {
    pushToIFrame(message);
    return;
  }

  if (message.method !== 'feed') {
    return;
  }
  if (message.url === __WEBPACK_IMPORTED_MODULE_0__common_js__["f" /* FORYOU_FEED_URL */]) {
    pushToIFrame(message);
  }

  Object(__WEBPACK_IMPORTED_MODULE_0__common_js__["h" /* Log */])(`${iframePath} got url: ${message.url}`);
  Object(__WEBPACK_IMPORTED_MODULE_0__common_js__["l" /* getCurrentTab */])().then(tab => {
    const currentUrl = Object(__WEBPACK_IMPORTED_MODULE_0__common_js__["m" /* normalizedURL */])(tab.url);
    Object(__WEBPACK_IMPORTED_MODULE_0__common_js__["h" /* Log */])(`${iframePath} current url: ${currentUrl}`);
    if (message.url === currentUrl) {
      if (currentUrl === __WEBPACK_IMPORTED_MODULE_0__common_js__["f" /* FORYOU_FEED_URL */]) {
        message.clearRelated = true;
      }
      pushToIFrame(message);
    }
  });
}

var iframeLoaded;
var iframeWindow;
var iframePath;

function pushToIFrame(message) {
  if (!iframeWindow) {
    let src = `${__WEBPACK_IMPORTED_MODULE_0__common_js__["n" /* state */].WEB_SERVER}${iframePath}`;
    const panel = document.querySelector('#panel');
    panel.style.display = 'block';
    const contentIframe = document.createElement('iframe');
    contentIframe.src = `${src}`;
    iframeLoaded = new Promise(function (resolve) {
      contentIframe.onload = resolve;
    });
    panel.appendChild(contentIframe);
    iframeWindow = contentIframe.contentWindow;
  }
  Object(__WEBPACK_IMPORTED_MODULE_0__common_js__["h" /* Log */])(`BG$ posting to iframe: ${JSON.stringify(message)}`);
  iframeLoaded.then(() => iframeWindow.postMessage(message, __WEBPACK_IMPORTED_MODULE_0__common_js__["n" /* state */].WEB_SERVER));
}

function receiveMessage(event) {
  if (event.origin != __WEBPACK_IMPORTED_MODULE_0__common_js__["n" /* state */].WEB_SERVER) {
    // We must drop all messages sent from random websites / extensions.
    return;
  }
  let message = event.data;
  if (message.method != 'read') {
    return;
  }
  const card = JSON.parse(message.json);
  browser.runtime.sendMessage({
    method: 'read',
    url: message.url,
    card: card,
    uiElement: iframePath,
  });
}

function initIframe(path) {
  browser.runtime.onMessage.addListener(onFeed);
  browser.cookies.get({ url: __WEBPACK_IMPORTED_MODULE_0__common_js__["d" /* COOKIE_URL */], name: __WEBPACK_IMPORTED_MODULE_0__common_js__["c" /* COOKIE_NAMES */].webServer }).then(cookie => {
    if (cookie) {
      __WEBPACK_IMPORTED_MODULE_0__common_js__["n" /* state */].WEB_SERVER = cookie.value;
    }
  })
  iframePath = path;
  Object(__WEBPACK_IMPORTED_MODULE_0__common_js__["l" /* getCurrentTab */])().then(currentTab => {
    browser.runtime.sendMessage({ method: 'iframeActive', windowId: currentTab.windowId, url: currentTab.url, uiElement: iframePath });
    // ping the background every second
    setInterval(()=> {
      browser.runtime.sendMessage({ method: 'iframeAlive', windowId: currentTab.windowId });
    }, 1000);
  });
  window.addEventListener('message', receiveMessage, false);
}


/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iframe_js__ = __webpack_require__(1);


window.onload = () => Object(__WEBPACK_IMPORTED_MODULE_0__iframe_js__["a" /* default */])('/sidebar');


/***/ })

/******/ });