import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import React from 'react';
import { useStore2 } from '../../hooks';
import { isCheckBoxType } from '../../utils';

var Description = function Description(_ref) {
  var displayType = _ref.displayType,
      schema = _ref.schema;
  var description = schema.description,
      descType = schema.descType;
  if (!description) return null;

  switch (displayType) {
    case 'row':
      return /*#__PURE__*/React.createElement(_Tooltip, {
        title: description
      }, /*#__PURE__*/React.createElement("i", {
        className: "fr-tooltip-icon"
      }));

    case 'inline':
      return null;

    default:
      if (descType === 'icon') {
        return /*#__PURE__*/React.createElement(_Tooltip, {
          title: description
        }, /*#__PURE__*/React.createElement("i", {
          className: "fr-tooltip-icon"
        }));
      }

      return /*#__PURE__*/React.createElement("span", {
        className: "fr-desc ml2"
      }, "( ".concat(description, " )"));
  }
};

var Title = function Title(_ref2) {
  var labelClass = _ref2.labelClass,
      labelStyle = _ref2.labelStyle,
      schema = _ref2.schema,
      displayType = _ref2.displayType;

  var _useStore = useStore2(),
      globalDisplayType = _useStore.displayType,
      readOnly = _useStore.readOnly;

  var title = schema.title,
      required = schema.required,
      type = schema.type;
  var isObjType = type === 'object';

  var _displayType = schema.displayType || displayType || globalDisplayType || 'column';

  return /*#__PURE__*/React.createElement("div", {
    className: labelClass,
    style: labelStyle
  }, title ? /*#__PURE__*/React.createElement("label", {
    className: "fr-label-title ".concat(isCheckBoxType(schema, readOnly) || _displayType === 'column' ? 'no-colon' : '') // checkbox不带冒号
    ,
    title: title
  }, required === true && /*#__PURE__*/React.createElement("span", {
    className: "fr-label-required"
  }, " *"), /*#__PURE__*/React.createElement("span", {
    className: "".concat(isObjType ? 'b' : '', " ").concat(_displayType === 'column' ? 'flex-none' : '')
  }, /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: title
    }
  })), /*#__PURE__*/React.createElement(Description, {
    schema: schema,
    displayType: _displayType
  })) : null);
};

export default Title;