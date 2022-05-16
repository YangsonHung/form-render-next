import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";
import "antd/es/slider/style";
import _Slider from "antd/es/slider";
var _excluded = ["schema", "value", "onChange", "hideInput", "inputProps"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';

var SliderWithNumber = function SliderWithNumber(_ref) {
  var schema = _ref.schema,
      value = _ref.value,
      onChange = _ref.onChange,
      hideInput = _ref.hideInput,
      inputProps = _ref.inputProps,
      rest = _objectWithoutProperties(_ref, _excluded);

  var max = schema.max,
      min = schema.min,
      step = schema.step;
  var setting = {};

  if (max || max === 0) {
    setting = {
      max: max
    };
  }

  if (min || min === 0) {
    setting = _objectSpread(_objectSpread({}, setting), {}, {
      min: min
    });
  }

  if (step) {
    setting = _objectSpread(_objectSpread({}, setting), {}, {
      step: step
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "fr-slider"
  }, /*#__PURE__*/React.createElement(_Slider, _extends({
    style: {
      flexGrow: 1,
      marginRight: hideInput ? 0 : 12
    }
  }, setting, {
    onChange: onChange,
    value: typeof value === 'number' ? value : min || 0
  }, rest)), hideInput ? null : /*#__PURE__*/React.createElement(_InputNumber, _extends({}, setting, inputProps, {
    style: {
      width: '90px'
    },
    value: value,
    onChange: onChange
  })));
};

export default SliderWithNumber;