import "antd/es/upload/style";
import _Upload from "antd/es/upload";
import "antd/es/button/style";
import _Button from "antd/es/button";
import _UploadOutlined from "@ant-design/icons/es/icons/UploadOutlined";
import "antd/es/message/style";
import _message from "antd/es/message";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { get } from 'lodash-es';
import React from 'react';
export default function FrUpload(_ref) {
  var action = _ref.action,
      value = _ref.value,
      _onChange = _ref.onChange,
      uploadProps = _ref.uploadProps,
      buttonProps = _ref.buttonProps,
      schema = _ref.schema;

  var props = _objectSpread({
    name: 'file',
    type: 'file',
    action: action,
    // 旧的兼容
    onChange: function onChange(info) {
      if (info.file.status === 'done') {
        _message.success("".concat(info.file.name, " \u4E0A\u4F20\u6210\u529F"));

        var path = get(schema, 'props.path', '');
        var url = path ? get(info.file.response, path) : info.file.response.url;

        _onChange(url);
      } else if (info.file.status === 'error') {
        _message.error("".concat(info.file.name, " \u4E0A\u4F20\u5931\u8D25"));
      }
    },
    onRemove: function onRemove() {
      _onChange('');
    }
  }, uploadProps);

  var defaultBtnProps = {
    icon: /*#__PURE__*/React.createElement(_UploadOutlined, null),
    children: '上传'
  };

  var btnProps = _objectSpread(_objectSpread({}, defaultBtnProps), buttonProps);

  return /*#__PURE__*/React.createElement("div", {
    className: "fr-upload-mod"
  }, /*#__PURE__*/React.createElement(_Upload, _extends({}, props, {
    className: "fr-upload-file"
  }), /*#__PURE__*/React.createElement(_Button, btnProps)), value && /*#__PURE__*/React.createElement("a", {
    href: value,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "fr-upload-preview"
  }, "\u5DF2\u4E0A\u4F20\u5730\u5740"));
}