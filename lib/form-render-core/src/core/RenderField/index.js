"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("../../hooks");

var _useDebounce = _interopRequireDefault(require("../../useDebounce"));

var _utils = require("../../utils");

var _validator = require("../../validator");

var _ErrorMessage = _interopRequireDefault(require("./ErrorMessage"));

var _ExtendedWidget = _interopRequireDefault(require("./ExtendedWidget"));

var _Extra = _interopRequireDefault(require("./Extra"));

var _Title = _interopRequireDefault(require("./Title"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: 之后不要直接用get，收口到一个内部方法getValue，便于全局 ctrl + f 查找
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

  var _useStore = (0, _hooks.useStore)(),
      formData = _useStore.formData,
      flatten = _useStore.flatten;

  var _useStore2 = (0, _hooks.useStore2)(),
      debounceInput = _useStore2.debounceInput,
      readOnly = _useStore2.readOnly,
      disabled = _useStore2.disabled,
      showValidate = _useStore2.showValidate,
      validateMessages = _useStore2.validateMessages,
      locale = _useStore2.locale,
      watch = _useStore2.watch;

  var _useTools = (0, _hooks.useTools)(),
      onValuesChange = _useTools.onValuesChange,
      onItemChange = _useTools.onItemChange,
      setEditing = _useTools.setEditing,
      touchKey = _useTools.touchKey,
      _setErrors = _useTools._setErrors;

  var formDataRef = (0, _react.useRef)();
  formDataRef.current = formData; // console.log('<renderField>', $id);

  var errObj = errorFields.find(function (err) {
    return err.name === dataPath;
  });
  var errorMessage = errObj && errObj.error; // 是一个list

  var hasError = Array.isArray(errorMessage) && errorMessage.length > 0; // 补上这个class，会自动让下面所有的展示ui变红！

  var contentClass = hasError && showValidate ? _contentClass + ' ant-form-item-has-error' : _contentClass;
  var contentStyle = {};
  var debouncedSetEditing = (0, _useDebounce.default)(setEditing, 350);

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

    (0, _validator.validateField)({
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
    return (0, _utils.getValueByPath)(formData, path);
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

  if ((0, _utils.isCheckBoxType)(_schema, _readOnly)) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _showTitle && /*#__PURE__*/_react.default.createElement("div", placeholderTitleProps), /*#__PURE__*/_react.default.createElement("div", {
      className: contentClass,
      style: contentStyle
    }, /*#__PURE__*/_react.default.createElement(_ExtendedWidget.default, widgetProps), /*#__PURE__*/_react.default.createElement(_Extra.default, widgetProps), /*#__PURE__*/_react.default.createElement(_ErrorMessage.default, messageProps)));
  }

  var titleElement = /*#__PURE__*/_react.default.createElement(_Title.default, titleProps);

  if ((0, _utils.isObjType)(_schema)) {
    titleElement = /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex'
      }
    }, titleElement, /*#__PURE__*/_react.default.createElement(_ErrorMessage.default, messageProps));
    return /*#__PURE__*/_react.default.createElement("div", {
      className: contentClass,
      style: contentStyle
    }, /*#__PURE__*/_react.default.createElement(_ExtendedWidget.default, _extends({}, widgetProps, {
      message: errorMessage,
      title: _showTitle ? titleElement : undefined
    })), /*#__PURE__*/_react.default.createElement(_Extra.default, widgetProps));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _showTitle && titleElement, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(contentClass, " ").concat(hideTitle ? 'fr-content-no-title' : ''),
    style: contentStyle
  }, /*#__PURE__*/_react.default.createElement(_ExtendedWidget.default, widgetProps), /*#__PURE__*/_react.default.createElement(_Extra.default, widgetProps), /*#__PURE__*/_react.default.createElement(_ErrorMessage.default, messageProps)));
};

var _default = RenderField;
exports.default = _default;