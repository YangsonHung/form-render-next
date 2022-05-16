function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
export var Ctx = /*#__PURE__*/createContext(function () {});
export var StoreCtx = /*#__PURE__*/createContext({});
export var Store2Ctx = /*#__PURE__*/createContext({});
export var useTools = function useTools() {
  return useContext(Ctx);
};
export var useStore = function useStore() {
  return useContext(StoreCtx);
};
export var useStore2 = function useStore2() {
  return useContext(Store2Ctx);
};
export var useSet = function useSet(initState) {
  var _useReducer = useReducer(function (state, newState) {
    var action = newState;

    if (typeof newState === 'function') {
      action = action(state);
    }

    if (newState.action && newState.payload) {
      action = newState.payload;

      if (typeof action === 'function') {
        action = action(state);
      }
    }

    var result = _objectSpread(_objectSpread({}, state), action); // console.group(newState.action || 'action'); // TODO: give it a name
    // console.log('%cState:', 'color: #9E9E9E; font-weight: 700;', state);
    // console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
    // console.log('%cNext:', 'color: #47B04B; font-weight: 700;', result);
    // console.groupEnd();


    // console.group(newState.action || 'action'); // TODO: give it a name
    // console.log('%cState:', 'color: #9E9E9E; font-weight: 700;', state);
    // console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
    // console.log('%cNext:', 'color: #47B04B; font-weight: 700;', result);
    // console.groupEnd();
    return result;
  }, initState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      setState = _useReducer2[1];

  return [state, setState];
};
export function useInterval(callback, delay, start) {
  var savedCallback = useRef();
  useEffect(function () {
    savedCallback.current = callback;
  }, [callback]);
  var id = useRef();
  useEffect(function () {
    if (!start) {
      return;
    }

    function tick() {
      savedCallback && savedCallback.current && savedCallback.current();
    }

    tick();

    if (delay !== null) {
      id.current = setInterval(tick, delay);
      return function () {
        return clearInterval(id.current);
      };
    }
  }, [delay, start]);
  return function () {
    return clearInterval(id.current);
  };
}
export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  var ref = useRef(); // Store current value in ref

  useEffect(function () {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)

  return ref.current;
}
export var useShowOnce = function useShowOnce(localKey) {
  // 从 localStorage 读取 key 值
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var localStr;

  try {
    localStr = localStorage.getItem(localKey);
  } catch (error) {}

  if (!localStr) {
    setShow(true);
    localStorage.setItem(localKey, JSON.stringify(true));
  }

  return show;
};
export var useModal = function useModal() {
  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      show = _useState4[0],
      setShow = _useState4[1];

  var toggle = function toggle() {
    return setShow(!show);
  };

  return [show, toggle];
};
export var useWindowState = function useWindowState(initState) {
  var _useState5 = useState(initState),
      _useState6 = _slicedToArray(_useState5, 2),
      state = _useState6[0],
      setState = _useState6[1];

  return [state, setState];
};
export var useStorageState = function useStorageState() {
  var initState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var searchKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'SAVES';

  var readSearchFromStorage = function readSearchFromStorage() {
    var searchStr = localStorage.getItem(searchKey);

    if (searchStr) {
      try {
        return JSON.parse(searchStr);
      } catch (error) {
        return initState;
      }
    }

    return initState;
  };

  var _useState7 = useState(readSearchFromStorage()),
      _useState8 = _slicedToArray(_useState7, 2),
      data = _useState8[0],
      setData = _useState8[1];

  var setSearchWithStorage = function setSearchWithStorage(search) {
    setData(search);
    localStorage.setItem(searchKey, JSON.stringify(search));
  };

  return [data, setSearchWithStorage];
};