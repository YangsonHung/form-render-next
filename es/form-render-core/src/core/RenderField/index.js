function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useRef } from 'react';
import { useStore, useStore2, useTools } from '../../hooks';
import useDebouncedCallback from '../../useDebounce';
import { getValueByPath, isCheckBoxType, isObjType } from '../../utils';
import { validateField } from '../../validator';
import ErrorMessage from './ErrorMessage';
import ExtendedWidget from './ExtendedWidget';
import Extra from './Extra';
import FieldTitle from './Title'; // TODO: 之后不要直接用get，收口到一个内部方法getValue，便于全局 ctrl + f 查找

var RenderField = function RenderField(props) {
  var $id = props.$id,
      dataIndex = props.dataIndex,
      dataPath = props.dataPath,
      _value = props._value,
      dependValues = props.dependValues,
      _schema = props._schema,
      labelClass = props.labelClass,
      labelStyle = props.labelStyle,
      _contentClass = props.contentClass,
      children = props.children,
      _props$errorFields = props.errorFields,
      errorFields = _props$errorFields === void 0 ? [] : _props$errorFields,
      hideTitle = props.hideTitle,
      displayType = props.displayType;

  var _useStore = useStore(),
      formData = _useStore.formData,
      flatten = _useStore.flatten;

  var _useStore2 = useStore2(),
      debounceInput = _useStore2.debounceInput,
      readOnly = _useStore2.readOnly,
      disabled = _useStore2.disabled,
      showValidate = _useStore2.showValidate,
      validateMessages = _useStore2.validateMessages,
      locale = _useStore2.locale,
      watch = _useStore2.watch;

  var _useTools = useTools(),
      onValuesChange = _useTools.onValuesChange,
      onItemChange = _useTools.onItemChange,
      setEditing = _useTools.setEditing,
      touchKey = _useTools.touchKey,
      _setErrors = _useTools._setErrors;

  var formDataRef = useRef();
  formDataRef.current = formData; // console.log('<renderField>', $id);

  var errObj = errorFields.find(function (err) {
    return err.name === dataPath;
  });
  var errorMessage = errObj && errObj.error; // 是一个list

  var hasError = Array.isArray(errorMessage) && errorMessage.length > 0; // 补上这个class，会自动让下面所有的展示ui变红！

  var contentClass = hasError && showValidate ? _contentClass + ' ant-form-item-has-error' : _contentClass;
  var contentStyle = {};
  var debouncedSetEditing = useDebouncedCallback(setEditing, 350);

  var _readOnly = readOnly !== undefined ? readOnly : _schema.readOnly;

  var _disabled = disabled !== undefined ? disabled : _schema.disabled;

  var removeDupErrors = function removeDupErrors(arr) {
    if (!Array.isArray(arr)) {
      console.log('in removeDups: param is not an array');
      return;
    }

    var array = [];

    for (var i = 0; i < arr.length; i++) {
      var sameNameIndex = array.findIndex(function (item) {
        return item.name === arr[i].name;
      });

      if (sameNameIndex > -1) {
        var sameNameItem = array[sameNameIndex];
        var error1 = sameNameItem.error;
        var error2 = arr[i].error;
        array[sameNameIndex] = {
          name: sameNameItem.name,
          error: error1.length > 0 && error2.length > 0 ? error2 : []
        };
      } else {
        array.push(arr[i]);
      }
    }

    return array.filter(function (item) {
      return Array.isArray(item.error) && item.error.length > 0;
    });
  }; // TODO: 优化一下，只有touch还是false的时候，setTouched


  var onChange = function onChange(value) {
    // 动过的key，算被touch了, 这里之后要考虑动的来源
    touchKey(dataPath); // 开始编辑，节流

    if (debounceInput) {
      setEditing(true);
      debouncedSetEditing(false);
    }

    if (typeof dataPath === 'string') {
      onItemChange(dataPath, value);
    } // 先不暴露给外部，这个api


    if (typeof onValuesChange === 'function') {
      onValuesChange(_defineProperty({}, dataPath, value), formDataRef.current);
    }

    validateField({
      path: dataPath,
      formData: formDataRef.current,
      flatten: flatten,
      options: {
        locale: locale,
        validateMessages: validateMessages
      }
    }).then(function (res) {
      _setErrors(function (errors) {
        return removeDupErrors([].concat(_toConsumableArray(errors), _toConsumableArray(res)));
      });
    });
  };

  var titleProps = {
    labelClass: labelClass,
    labelStyle: labelStyle,
    schema: _schema,
    displayType: displayType
  };
  var messageProps = {
    message: errorMessage,
    schema: _schema,
    displayType: displayType,
    softHidden: displayType === 'inline',
    // 这个是如果没有校验信息时，展示与否
    hardHidden: showValidate === false || _readOnly === true // 这个是强制的展示与否

  };
  var placeholderTitleProps = {
    className: labelClass,
    style: labelStyle
  };

  var _showTitle = !hideTitle && typeof _schema.title === 'string'; // TODO: 这块最好能判断上一层是list1，


  if (hideTitle && _schema.title) {
    _schema.placeholder = _schema.placeholder || _schema.title;
  }

  var _getValue = function _getValue(path) {
    return getValueByPath(formData, path);
  };

  var widgetProps = {
    $id: $id,
    schema: _schema,
    readOnly: _readOnly,
    disabled: _disabled,
    onChange: onChange,
    getValue: _getValue,
    formData: formData,
    value: _value,
    dependValues: dependValues,
    onItemChange: onItemChange,
    dataIndex: dataIndex,
    dataPath: dataPath,
    children: children,
    watch: watch
  }; // if (_schema && _schema.default !== undefined) {
  //   widgetProps.value = _schema.default;
  // }
  // checkbox必须单独处理，布局太不同了

  if (isCheckBoxType(_schema, _readOnly)) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, _showTitle && /*#__PURE__*/React.createElement("div", placeholderTitleProps), /*#__PURE__*/React.createElement("div", {
      className: contentClass,
      style: contentStyle
    }, /*#__PURE__*/React.createElement(ExtendedWidget, widgetProps), /*#__PURE__*/React.createElement(Extra, widgetProps), /*#__PURE__*/React.createElement(ErrorMessage, messageProps)));
  }

  var titleElement = /*#__PURE__*/React.createElement(FieldTitle, titleProps);

  if (isObjType(_schema)) {
    titleElement = /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, titleElement, /*#__PURE__*/React.createElement(ErrorMessage, messageProps));
    return /*#__PURE__*/React.createElement("div", {
      className: contentClass,
      style: contentStyle
    }, /*#__PURE__*/React.createElement(ExtendedWidget, _extends({}, widgetProps, {
      message: errorMessage,
      title: _showTitle ? titleElement : undefined
    })), /*#__PURE__*/React.createElement(Extra, widgetProps));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, _showTitle && titleElement, /*#__PURE__*/React.createElement("div", {
    className: "".concat(contentClass, " ").concat(hideTitle ? 'fr-content-no-title' : ''),
    style: contentStyle
  }, /*#__PURE__*/React.createElement(ExtendedWidget, widgetProps), /*#__PURE__*/React.createElement(Extra, widgetProps), /*#__PURE__*/React.createElement(ErrorMessage, messageProps)));
};

export default RenderField;