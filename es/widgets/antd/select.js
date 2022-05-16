import "antd/es/select/style";
import _Select from "antd/es/select";
var _excluded = ["schema", "style", "value", "onChange", "options", "addons"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { isUndefined } from 'lodash-es';
import React from 'react';
import { getArray } from '../../utils';

var FrSelect = function FrSelect(_ref) {
  var schema = _ref.schema,
      style = _ref.style,
      value = _ref.value,
      onChange = _ref.onChange,
      _options = _ref.options,
      addons = _ref.addons,
      rest = _objectWithoutProperties(_ref, _excluded);

  var options; // 如果已经有外部注入的options了，内部的schema就会被忽略

  if (_options && Array.isArray(_options)) {
    options = _options;
  } else {
    var _ref2 = schema || {},
        enums = _ref2.enum,
        enumNames = _ref2.enumNames;

    options = getArray(enums).map(function (item, idx) {
      var label = enumNames && Array.isArray(enumNames) ? enumNames[idx] : item;
      var isHtml = typeof label === 'string' && label[0] === '<';

      if (isHtml) {
        label = /*#__PURE__*/React.createElement("span", {
          dangerouslySetInnerHTML: {
            __html: label
          }
        });
      }

      return {
        label: label,
        value: item
      };
    });
  }

  var handleChange = function handleChange(val) {
    var _val = !isUndefined(val) ? val : null;

    onChange(_val);
  };

  var finalProps = _objectSpread({
    value: value,
    options: options,
    style: _objectSpread({
      width: '100%'
    }, style),
    onChange: handleChange
  }, rest);

  if (rest.showSearch && !!schema.props.onSearch) {
    finalProps.onSearch = function (search) {
      var _onSearch = addons.watch[schema.props.onSearch];
      if (typeof _onSearch === 'function') _onSearch(search);
    };
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Select, _extends({
    defaultValue: value
  }, finalProps)));
};

export default FrSelect;