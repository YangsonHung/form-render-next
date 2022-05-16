"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _createWidget = require("../../createWidget");

var _hooks = require("../../hooks");

var _mapping = require("../../mapping");

var _utils = require("../../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ErrorSchema = function ErrorSchema(schema) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: 'red'
    }
  }, "schema\u672A\u5339\u914D\u5230\u5C55\u793A\u7EC4\u4EF6\uFF1A"), /*#__PURE__*/_react.default.createElement("div", null, JSON.stringify(schema)));
};

var ExtendedWidget = function ExtendedWidget(_ref) {
  var schema = _ref.schema,
      onChange = _ref.onChange,
      value = _ref.value,
      dependValues = _ref.dependValues,
      children = _ref.children,
      onItemChange = _ref.onItemChange,
      formData = _ref.formData,
      getValue = _ref.getValue,
      readOnly = _ref.readOnly,
      dataPath = _ref.dataPath,
      disabled = _ref.disabled,
      dataIndex = _ref.dataIndex,
      watch = _ref.watch;

  var _useTools = (0, _hooks.useTools)(),
      widgets = _useTools.widgets,
      mapping = _useTools.mapping,
      setValueByPath = _useTools.setValueByPath,
      getSchemaByPath = _useTools.getSchemaByPath,
      setSchemaByPath = _useTools.setSchemaByPath,
      setSchema = _useTools.setSchema,
      setValues = _useTools.setValues,
      getValues = _useTools.getValues,
      resetFields = _useTools.resetFields,
      setErrorFields = _useTools.setErrorFields,
      removeErrorField = _useTools.removeErrorField;

  var _useStore = (0, _hooks.useStore)(),
      globalProps = _useStore.globalProps; // if (isObjType(schema)) {
  //   return <Map value={value} onChange={onChange} children={children} />;
  // }
  // if (isListType(schema)) {
  //   return 'haha';
  // }
  // return <Input value={value} onChange={e => onChange(e.target.value)} />;
  // TODO: calc widget, better way?
  // let widgetName = useMemo(() => getWidgetName(schema, mapping), [
  //   JSON.stringify(schema),
  // ]);


  var widgetName = (0, _mapping.getWidgetName)(schema, mapping);
  var customName = schema.widget || schema['ui:widget'];

  if (customName && widgets[customName]) {
    widgetName = customName;
  }

  var readOnlyName = schema.readOnlyWidget || 'html';

  if (readOnly && !(0, _utils.isObjType)(schema) && !(0, _utils.isListType)(schema)) {
    widgetName = readOnlyName;
  }

  if (!widgetName) {
    widgetName = 'input';
    return /*#__PURE__*/_react.default.createElement(ErrorSchema, {
      schema: schema
    });
  }

  var Widget = widgets[widgetName];
  var extraSchema = _mapping.extraSchemaList[widgetName];

  var widgetProps = _objectSpread(_objectSpread({
    schema: _objectSpread(_objectSpread({}, schema), extraSchema),
    onChange: onChange,
    value: value,
    children: children,
    disabled: disabled,
    readOnly: readOnly
  }, schema.props), globalProps);

  if (schema.type === 'string' && typeof schema.max === 'number') {
    widgetProps.maxLength = schema.max;
  }

  ['title', 'placeholder', 'disabled', 'format'].forEach(function (key) {
    if (schema[key]) {
      widgetProps[key] = schema[key];
    }
  });

  if (schema.props) {
    widgetProps = _objectSpread(_objectSpread({}, widgetProps), schema.props);
  }

  Object.keys(schema).forEach(function (key) {
    if (typeof key === 'string' && key.toLowerCase().indexOf('props') > -1 && key.length > 5) {
      widgetProps[key] = schema[key];
    }
  }); // 支持 addonAfter 为自定义组件的情况

  if ((0, _utils.isObject)(widgetProps.addonAfter) && widgetProps.addonAfter.widget) {
    var AddonAfterWidget = widgets[widgetProps.addonAfter.widget];
    widgetProps.addonAfter = /*#__PURE__*/_react.default.createElement(AddonAfterWidget, schema);
  }

  var hideSelf = function hideSelf() {
    var hidden = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    setSchemaByPath(schema.$id, {
      hidden: hidden
    });
  }; // 避免传组件不接受的props，按情况传多余的props


  widgetProps.addons = {
    dependValues: dependValues,
    onItemChange: onItemChange,
    getValue: getValue,
    formData: formData,
    dataPath: dataPath,
    dataIndex: dataIndex,
    setValueByPath: setValueByPath,
    setValue: setValueByPath,
    getSchemaByPath: getSchemaByPath,
    setSchemaByPath: setSchemaByPath,
    setSchema: setSchema,
    setValues: setValues,
    getValues: getValues,
    resetFields: resetFields,
    setErrorFields: setErrorFields,
    removeErrorField: removeErrorField,
    hideSelf: hideSelf,
    watch: watch
  };
  var finalProps = (0, _createWidget.transformProps)(widgetProps);
  return /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: /*#__PURE__*/_react.default.createElement("div", null)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "fr-item-wrapper"
  }, /*#__PURE__*/_react.default.createElement(Widget, finalProps)));
};

var areEqual = function areEqual(prev, current) {
  if (prev.schema && current.schema) {
    if (prev.schema.$id === '#') {
      return false;
    }

    if (prev.schema.hidden && current.schema.hidden) {
      return true;
    }
  }

  if (prev.readOnly !== current.readOnly) {
    return false;
  }

  if (prev.disabled !== current.disabled) {
    return false;
  }

  if (JSON.stringify(prev.dependValues) !== JSON.stringify(current.dependValues)) {
    return false;
  }

  if ((0, _utils.isObjType)(prev.schema) && (0, _utils.isObjType)(current.schema)) {
    return false;
  }

  if (JSON.stringify(prev.value) === JSON.stringify(current.value) && JSON.stringify(prev.schema) === JSON.stringify(current.schema)) {
    return true;
  }

  return false;
};

var _default = /*#__PURE__*/_react.default.memo(ExtendedWidget, areEqual);

exports.default = _default;