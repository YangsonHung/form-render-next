import "antd/es/input/style";
import _Input from "antd/es/input";
var _excluded = ["value", "prefix", "suffix", "addonText", "onChange"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { isUrl } from '../../utils';

var UrlNode = function UrlNode(_ref) {
  var value = _ref.value,
      _ref$addonText = _ref.addonText,
      addonText = _ref$addonText === void 0 ? '测试链接' : _ref$addonText;
  var useUrl = isUrl(value);

  if (useUrl) {
    return /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      href: value
    }, addonText);
  }

  return /*#__PURE__*/React.createElement("div", null, addonText);
};

export default function UrlInput(_ref2) {
  var value = _ref2.value,
      prefix = _ref2.prefix,
      suffix = _ref2.suffix,
      addonText = _ref2.addonText,
      onChange = _ref2.onChange,
      rest = _objectWithoutProperties(_ref2, _excluded);

  var _value = value || '';

  if (prefix) {
    _value = _value.replace(prefix, '');
  }

  if (suffix) {
    _value = _value.replace(suffix, '');
  }

  var handleChange = function handleChange(e) {
    var _value = e.target.value;

    if (!_value) {
      onChange(_value);
      return;
    }

    if (prefix) {
      _value = prefix + _value;
    }

    if (suffix) {
      _value = _value + suffix;
    }

    onChange(_value);
  };

  return /*#__PURE__*/React.createElement(_Input, _extends({
    value: _value,
    prefix: prefix,
    suffix: suffix,
    onChange: handleChange,
    addonAfter: /*#__PURE__*/React.createElement(UrlNode, {
      value: value,
      prefix: prefix,
      suffix: suffix,
      addonText: addonText
    })
  }, rest));
}