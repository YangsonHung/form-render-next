"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../../hooks");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Description = function Description(_ref) {
  var displayType = _ref.displayType,
      schema = _ref.schema;
  var description = schema.description,
      descType = schema.descType;
  if (!description) return null;

  switch (displayType) {
    case 'row':
      return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        title: description
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fr-tooltip-icon"
      }));

    case 'inline':
      return null;

    default:
      if (descType === 'icon') {
        return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
          title: description
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fr-tooltip-icon"
        }));
      }

      return /*#__PURE__*/_react.default.createElement("span", {
        className: "fr-desc ml2"
      }, "( ".concat(description, " )"));
  }
};

var Title = function Title(_ref2) {
  var labelClass = _ref2.labelClass,
      labelStyle = _ref2.labelStyle,
      schema = _ref2.schema,
      displayType = _ref2.displayType;

  var _useStore = (0, _hooks.useStore2)(),
      globalDisplayType = _useStore.displayType,
      readOnly = _useStore.readOnly;

  var title = schema.title,
      required = schema.required,
      type = schema.type;
  var isObjType = type === 'object';

  var _displayType = schema.displayType || displayType || globalDisplayType || 'column';

  return /*#__PURE__*/_react.default.createElement("div", {
    className: labelClass,
    style: labelStyle
  }, title ? /*#__PURE__*/_react.default.createElement("label", {
    className: "fr-label-title ".concat((0, _utils.isCheckBoxType)(schema, readOnly) || _displayType === 'column' ? 'no-colon' : '') // checkbox不带冒号
    ,
    title: title
  }, required === true && /*#__PURE__*/_react.default.createElement("span", {
    className: "fr-label-required"
  }, " *"), /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(isObjType ? 'b' : '', " ").concat(_displayType === 'column' ? 'flex-none' : '')
  }, /*#__PURE__*/_react.default.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: title
    }
  })), /*#__PURE__*/_react.default.createElement(Description, {
    schema: schema,
    displayType: _displayType
  })) : null);
};

var _default = Title;
exports.default = _default;