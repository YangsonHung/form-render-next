import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/popover/style";
import _Popover from "antd/es/popover";
import _PictureOutlined from "@ant-design/icons/es/icons/PictureOutlined";
var _excluded = ["value"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
var DEFAULT_IMG = 'https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png';

var PreviewNode = function PreviewNode(_ref) {
  var value = _ref.value;
  return /*#__PURE__*/React.createElement(_Popover, {
    content: /*#__PURE__*/React.createElement("img", {
      src: value || DEFAULT_IMG,
      alt: "\u56FE\u7247\u5730\u5740\u9519\u8BEF",
      className: "fr-preview-image"
    }),
    className: "fr-preview",
    placement: "bottom"
  }, /*#__PURE__*/React.createElement(_PictureOutlined, null));
};

export default function imageInput(_ref2) {
  var value = _ref2.value,
      rest = _objectWithoutProperties(_ref2, _excluded);

  return /*#__PURE__*/React.createElement(_Input, _extends({
    value: value,
    addonAfter: /*#__PURE__*/React.createElement(PreviewNode, {
      value: value
    })
  }, rest));
}