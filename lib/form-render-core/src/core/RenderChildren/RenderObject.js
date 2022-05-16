"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var RenderObject = function RenderObject(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === void 0 ? [] : _ref$children,
      _ref$dataIndex = _ref.dataIndex,
      dataIndex = _ref$dataIndex === void 0 ? [] : _ref$dataIndex,
      displayType = _ref.displayType,
      hideTitle = _ref.hideTitle;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children.map(function (child, i) {
    var FRProps = {
      displayType: displayType,
      id: child,
      dataIndex: dataIndex,
      hideTitle: hideTitle
    };
    return /*#__PURE__*/_react.default.createElement(_index.default, _extends({
      key: i.toString()
    }, FRProps));
  }));
};

var _default = RenderObject;
exports.default = _default;