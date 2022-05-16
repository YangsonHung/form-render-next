function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import useForm from './useForm';

var connectForm = function connectForm(Component) {
  return /*#__PURE__*/forwardRef(function (props, ref) {
    var form = useForm();
    return /*#__PURE__*/React.createElement(Component, _extends({
      ref: ref
    }, props, {
      form: form
    }));
  });
};

export default connectForm;