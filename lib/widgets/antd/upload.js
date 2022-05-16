"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FrUpload;

require("antd/es/upload/style");

var _upload = _interopRequireDefault(require("antd/es/upload"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _UploadOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/UploadOutlined"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _lodashEs = require("lodash-es");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function FrUpload(_ref) {
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
        _message2.default.success("".concat(info.file.name, " \u4E0A\u4F20\u6210\u529F"));

        var path = (0, _lodashEs.get)(schema, 'props.path', '');
        var url = path ? (0, _lodashEs.get)(info.file.response, path) : info.file.response.url;

        _onChange(url);
      } else if (info.file.status === 'error') {
        _message2.default.error("".concat(info.file.name, " \u4E0A\u4F20\u5931\u8D25"));
      }
    },
    onRemove: function onRemove() {
      _onChange('');
    }
  }, uploadProps);

  var defaultBtnProps = {
    icon: /*#__PURE__*/_react.default.createElement(_UploadOutlined2.default, null),
    children: '上传'
  };

  var btnProps = _objectSpread(_objectSpread({}, defaultBtnProps), buttonProps);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "fr-upload-mod"
  }, /*#__PURE__*/_react.default.createElement(_upload.default, _extends({}, props, {
    className: "fr-upload-file"
  }), /*#__PURE__*/_react.default.createElement(_button.default, btnProps)), value && /*#__PURE__*/_react.default.createElement("a", {
    href: value,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "fr-upload-preview"
  }, "\u5DF2\u4E0A\u4F20\u5730\u5740"));
}