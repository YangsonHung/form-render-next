import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";
var _excluded = ["onChange", "format", "value", "style"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import moment from 'moment';
import React, { useMemo } from 'react';
import { getFormat } from '../../utils'; // TODO: 不要使用 moment，使用 dayjs

export default (function (_ref) {
  var onChange = _ref.onChange,
      format = _ref.format,
      value = _ref.value,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, _excluded);

  var dateFormat = getFormat(format);
  var valueObj = useMemo(function () {
    // week 的时候会返回 2020-31周 quarter 会返回 2020-Q2 需要处理之后才能被 moment
    var _value = value || undefined;

    if (typeof _value === 'string') {
      if (format === 'week') {
        _value = _value ? _value.substring(0, _value.length - 1) : _value;
      }

      if (format === 'quarter') {
        _value = _value.replace('Q', '');
      }
    }

    if (_value) {
      _value = moment(_value, dateFormat);
    }

    return _value;
  }, [value]);

  var handleChange = function handleChange(value, string) {
    onChange(string);
  };

  var dateParams = {
    value: valueObj,
    style: _objectSpread({
      width: '100%'
    }, style),
    onChange: handleChange
  }; // TODO: format 是在 options 里自定义的情况，是否要判断一下要不要 showTime

  if (format === 'dateTime') {
    dateParams.showTime = true;
  }

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  if (dateFormat === format) {
    dateParams.format = format;
  }

  return /*#__PURE__*/React.createElement(_DatePicker, _extends({}, dateParams, rest));
});