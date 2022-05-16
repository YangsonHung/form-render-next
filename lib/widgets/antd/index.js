"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widgets = exports.defaultWidgetNameList = void 0;

require("antd/es/rate/style");

var _rate = _interopRequireDefault(require("antd/es/rate"));

require("antd/es/switch/style");

var _switch = _interopRequireDefault(require("antd/es/switch"));

require("antd/es/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

require("antd/es/tree-select/style");

var _treeSelect = _interopRequireDefault(require("antd/es/tree-select"));

require("antd/es/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireDefault(require("react"));

var _checkboxes = _interopRequireDefault(require("./checkboxes"));

var _color = _interopRequireDefault(require("./color"));

var _date = _interopRequireDefault(require("./date"));

var _dateRange = _interopRequireDefault(require("./dateRange"));

var _html = _interopRequireDefault(require("./html"));

var _imageInput = _interopRequireDefault(require("./imageInput"));

var _list = _interopRequireDefault(require("./list"));

var _map = _interopRequireDefault(require("./map"));

var _multiSelect = _interopRequireDefault(require("./multiSelect"));

var _radio = _interopRequireDefault(require("./radio"));

var _select = _interopRequireDefault(require("./select"));

var _slider = _interopRequireDefault(require("./slider"));

var _time = _interopRequireDefault(require("./time"));

var _timeRange = _interopRequireDefault(require("./timeRange"));

var _upload = _interopRequireDefault(require("./upload"));

var _urlInput = _interopRequireDefault(require("./urlInput"));

var _excluded = ["style"],
    _excluded2 = ["style"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// const Cascader = React.lazy(() => import('antd/es/cascader'));
var TextArea = _input.default.TextArea;

var FrNumber = function FrNumber(_ref) {
  var style = _ref.style,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react.default.createElement(_inputNumber.default, _extends({
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
  return /*#__PURE__*/_react.default.createElement(TextArea, finalProps);
};

var FrTreeSelect = function FrTreeSelect(_ref2) {
  var style = _ref2.style,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/_react.default.createElement(_treeSelect.default, _extends({
    style: _objectSpread({
      width: '100%'
    }, style)
  }, rest));
}; // const FrCascader = ({ style, ...rest }) => (
//   <Cascader style={{ width: '100%', ...style }} {...rest} />
// );


var widgets = {
  input: _input.default,
  checkbox: _checkbox.default,
  checkboxes: _checkboxes.default,
  // checkbox多选
  color: _color.default,
  date: _date.default,
  time: _time.default,
  dateRange: _dateRange.default,
  timeRange: _timeRange.default,
  imageInput: _imageInput.default,
  url: _urlInput.default,
  list: _list.default,
  map: _map.default,
  multiSelect: _multiSelect.default,
  // 下拉多选
  number: FrNumber,
  radio: _radio.default,
  select: _select.default,
  slider: _slider.default,
  // 带滚条的number
  switch: _switch.default,
  textarea: FrTextArea,
  upload: _upload.default,
  html: _html.default,
  rate: _rate.default,
  treeSelect: FrTreeSelect // cascader: FrCascader,

};
exports.widgets = widgets;
var defaultWidgetNameList = Object.keys(widgets);
exports.defaultWidgetNameList = defaultWidgetNameList;