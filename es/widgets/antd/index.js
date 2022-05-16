import "antd/es/rate/style";
import _Rate from "antd/es/rate";
import "antd/es/switch/style";
import _Switch from "antd/es/switch";
import "antd/es/checkbox/style";
import _Checkbox from "antd/es/checkbox";
import "antd/es/tree-select/style";
import _TreeSelect from "antd/es/tree-select";
import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";
import "antd/es/input/style";
import _Input from "antd/es/input";
var _excluded = ["style"],
    _excluded2 = ["style"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import checkboxes from './checkboxes';
import color from './color';
import date from './date';
import dateRange from './dateRange';
import Html from './html';
import ImageInput from './imageInput';
import list from './list';
import map from './map';
import multiSelect from './multiSelect';
import radio from './radio';
import select from './select';
import slider from './slider';
import time from './time';
import timeRange from './timeRange';
import upload from './upload';
import urlInput from './urlInput'; // const Cascader = React.lazy(() => import('antd/es/cascader'));

var TextArea = _Input.TextArea;

var FrNumber = function FrNumber(_ref) {
  var style = _ref.style,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(_InputNumber, _extends({
    style: _objectSpread({
      width: '100%'
    }, style)
  }, rest));
};

var FrTextArea = function FrTextArea(props) {
  var finalProps = _objectSpread({
    autoSize: {
      minRows: 3
    }
  }, props);

  if (finalProps.rows) delete finalProps.autoSize;
  return /*#__PURE__*/React.createElement(TextArea, finalProps);
};

var FrTreeSelect = function FrTreeSelect(_ref2) {
  var style = _ref2.style,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement(_TreeSelect, _extends({
    style: _objectSpread({
      width: '100%'
    }, style)
  }, rest));
}; // const FrCascader = ({ style, ...rest }) => (
//   <Cascader style={{ width: '100%', ...style }} {...rest} />
// );


export var widgets = {
  input: _Input,
  checkbox: _Checkbox,
  checkboxes: checkboxes,
  // checkbox多选
  color: color,
  date: date,
  time: time,
  dateRange: dateRange,
  timeRange: timeRange,
  imageInput: ImageInput,
  url: urlInput,
  list: list,
  map: map,
  multiSelect: multiSelect,
  // 下拉多选
  number: FrNumber,
  radio: radio,
  select: select,
  slider: slider,
  // 带滚条的number
  switch: _Switch,
  textarea: FrTextArea,
  upload: upload,
  html: Html,
  rate: _Rate,
  treeSelect: FrTreeSelect // cascader: FrCascader,

};
export var defaultWidgetNameList = Object.keys(widgets);