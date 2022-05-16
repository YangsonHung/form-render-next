import "antd/es/slider/style";
import _Slider from "antd/es/slider";
import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';

var PercentSlider = function PercentSlider(p) {
  var _p$schema = p.schema,
      max = _p$schema.max,
      min = _p$schema.min,
      step = _p$schema.step;
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

  var hideNumber = false;

  if (p.options && p.options.hideNumber) {
    hideNumber = true;
  }

  var isPercent = function isPercent(string) {
    return typeof string === 'string' && string.endsWith('%');
  };

  var numberValue = 100;

  if (isPercent(p.value)) {
    try {
      numberValue = Number(p.value.split('%')[0]);
      if (Number.isNaN(numberValue)) numberValue = 100;
    } catch (error) {}
  }

  var handleChange = function handleChange(newNumber) {
    var a = newNumber + '%';
    p.onChange(a);
  };

  var renderNumber = p.readonly ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: '80px'
    }
  }, p.value === (undefined || '') ? '-' : p.value + '%') : /*#__PURE__*/React.createElement(_InputNumber, _extends({}, p.options, setting, {
    style: {
      width: '80px'
    },
    value: numberValue,
    disabled: p.disabled,
    onChange: handleChange,
    formatter: function formatter(value) {
      return "".concat(value, "%");
    },
    parser: function parser(value) {
      return value.replace('%', '');
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "fr-slider"
  }, /*#__PURE__*/React.createElement(_Slider, _extends({
    style: {
      flexGrow: 1,
      marginRight: hideNumber ? 0 : 12
    }
  }, setting, {
    onChange: handleChange,
    max: 100,
    tipFormatter: function tipFormatter(v) {
      return v + '%';
    },
    value: numberValue || 100,
    disabled: p.disabled || p.readonly
  })), hideNumber ? null : renderNumber);
};

export default PercentSlider;