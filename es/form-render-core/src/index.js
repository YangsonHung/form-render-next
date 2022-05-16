var _excluded = ["id", "widgets", "mapping", "form", "className", "style", "beforeFinish", "onFinish", "displayType", "schema", "debug", "debugCss", "locale", "debounceInput", "size", "configProvider", "theme", "validateMessages", "watch", "config", "onMount", "labelWidth", "readOnly", "disabled", "allCollapsed", "onValuesChange", "column", "removeHiddenData", "globalProps"],
    _excluded2 = ["onItemChange", "setEditing", "touchKey", "setValueByPath", "getSchemaByPath", "setSchemaByPath", "setSchema", "setValues", "getValues", "resetFields", "submit", "endValidating", "endSubmitting", "setErrorFields", "removeErrorField", "removeTouched", "changeTouchedKeys", "syncStuff", "logOnMount", "logOnSubmit", "setFirstMount", "_setErrors"],
    _excluded3 = ["isOldVersion", "schema"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react';
import "./atom.css";
import Core from './core';
import { Ctx, Store2Ctx, StoreCtx } from './hooks';
import "./index.css";
import { mapping as defaultMapping } from './mapping';
import { getParamByName, msToTime, updateSchemaToNewVersion, yymmdd } from './utils';
import Watcher from './Watcher';

var defaultFinish = function defaultFinish(data, errors) {
  console.log('onFinish:', {
    data: data,
    errors: errors
  });
};

export { default as connectForm } from './connectForm';
export { createWidget } from './createWidget';
export { default as useForm } from './useForm';
export { defaultMapping as mapping };

function App(_ref) {
  var id = _ref.id,
      widgets = _ref.widgets,
      mapping = _ref.mapping,
      form = _ref.form,
      className = _ref.className,
      style = _ref.style,
      beforeFinish = _ref.beforeFinish,
      _ref$onFinish = _ref.onFinish,
      onFinish = _ref$onFinish === void 0 ? defaultFinish : _ref$onFinish,
      _ref$displayType = _ref.displayType,
      displayType = _ref$displayType === void 0 ? 'column' : _ref$displayType,
      schema = _ref.schema,
      debug = _ref.debug,
      debugCss = _ref.debugCss,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? 'cn' : _ref$locale,
      _ref$debounceInput = _ref.debounceInput,
      debounceInput = _ref$debounceInput === void 0 ? false : _ref$debounceInput,
      size = _ref.size,
      configProvider = _ref.configProvider,
      theme = _ref.theme,
      validateMessages = _ref.validateMessages,
      _ref$watch = _ref.watch,
      watch = _ref$watch === void 0 ? {} : _ref$watch,
      config = _ref.config,
      onMount = _ref.onMount,
      labelWidth = _ref.labelWidth,
      readOnly = _ref.readOnly,
      disabled = _ref.disabled,
      _ref$allCollapsed = _ref.allCollapsed,
      allCollapsed = _ref$allCollapsed === void 0 ? false : _ref$allCollapsed,
      onValuesChange = _ref.onValuesChange,
      column = _ref.column,
      _ref$removeHiddenData = _ref.removeHiddenData,
      removeHiddenData = _ref$removeHiddenData === void 0 ? false : _ref$removeHiddenData,
      _ref$globalProps = _ref.globalProps,
      globalProps = _ref$globalProps === void 0 ? {} : _ref$globalProps,
      rest = _objectWithoutProperties(_ref, _excluded);

  try {
    var _ = form.submit;
  } catch (error) {
    console.error('form 为必填 props，<FormRender /> 没有接收到 form 属性!');
  }

  var _column = schema && schema.column || column;

  var onItemChange = form.onItemChange,
      setEditing = form.setEditing,
      touchKey = form.touchKey,
      setValueByPath = form.setValueByPath,
      getSchemaByPath = form.getSchemaByPath,
      setSchemaByPath = form.setSchemaByPath,
      setSchema = form.setSchema,
      setValues = form.setValues,
      getValues = form.getValues,
      resetFields = form.resetFields,
      submit = form.submit,
      endValidating = form.endValidating,
      endSubmitting = form.endSubmitting,
      setErrorFields = form.setErrorFields,
      removeErrorField = form.removeErrorField,
      removeTouched = form.removeTouched,
      changeTouchedKeys = form.changeTouchedKeys,
      syncStuff = form.syncStuff,
      logOnMount = form.logOnMount,
      logOnSubmit = form.logOnSubmit,
      setFirstMount = form.setFirstMount,
      _setErrors = form._setErrors,
      valuesThatWillChange = _objectWithoutProperties(form, _excluded2);

  var submitData = valuesThatWillChange.submitData,
      errorFields = valuesThatWillChange.errorFields,
      isValidating = valuesThatWillChange.isValidating,
      outsideValidating = valuesThatWillChange.outsideValidating,
      isSubmitting = valuesThatWillChange.isSubmitting,
      formData = valuesThatWillChange.formData,
      flatten = valuesThatWillChange.flatten,
      showValidate = valuesThatWillChange.showValidate,
      firstMount = valuesThatWillChange.firstMount;
  useEffect(function () {
    // Schema最外层的type是object来判断，没有的话，认为schema没有传
    if (schema && schema.type) {
      setFirstMount(true);
      syncStuff({
        schema: schema,
        locale: locale,
        validateMessages: validateMessages,
        beforeFinish: beforeFinish,
        onMount: onMount,
        removeHiddenData: removeHiddenData
      });
    } else {}
  }, [JSON.stringify(schema)]);
  useEffect(function () {
    if (!firstMount && schema && schema.type) {
      if (typeof onMount === 'function') {
        // 等一下 useForm 里接到第一份schema时，计算第一份data的骨架
        setTimeout(function () {
          onMount();
        }, 0);
      }

      setTimeout(onMountLogger, 0);
    }
  }, [JSON.stringify(schema), firstMount]);

  var onMountLogger = function onMountLogger() {
    var start = new Date().getTime();

    if (typeof logOnMount === 'function' || typeof logOnSubmit === 'function') {
      sessionStorage.setItem('FORM_MOUNT_TIME', start);
      sessionStorage.setItem('FORM_START', start);
    }

    if (typeof logOnMount === 'function') {
      var logParams = {
        schema: schema,
        url: location.href,
        formData: JSON.stringify(form.getValues()),
        formMount: yymmdd(start)
      };

      if (id) {
        logParams.id = id;
      }

      logOnMount(logParams);
    } // 如果是要计算时间，在 onMount 时存一个时间戳


    if (typeof logOnSubmit === 'function') {
      sessionStorage.setItem('NUMBER_OF_SUBMITS', 0);
      sessionStorage.setItem('FAILED_ATTEMPTS', 0);
    }
  }; // 组件destroy的时候，destroy form，因为useForm可能在上层，所以不一定会跟着destroy


  useEffect(function () {
    return function () {
      form.resetFields();
    };
  }, []);
  var store = useMemo(function () {
    return _objectSpread(_objectSpread({}, valuesThatWillChange), {}, {
      globalProps: globalProps
    }, rest);
  }, [JSON.stringify(flatten), JSON.stringify(formData), JSON.stringify(errorFields), JSON.stringify(globalProps)]); // 不常用的context单独放一个地方

  var store2 = useMemo(function () {
    return {
      displayType: displayType,
      theme: theme,
      column: _column,
      debounceInput: debounceInput,
      debug: debug,
      labelWidth: labelWidth,
      locale: locale,
      validateMessages: validateMessages,
      readOnly: readOnly,
      disabled: disabled,
      allCollapsed: allCollapsed,
      showValidate: showValidate,
      watch: watch
    };
  }, [displayType, theme, _column, debounceInput, debug, labelWidth, locale, validateMessages, readOnly, disabled, allCollapsed, showValidate, watch]);
  var tools = useMemo(function () {
    return _objectSpread({
      widgets: widgets,
      mapping: _objectSpread(_objectSpread({}, defaultMapping), mapping),
      onValuesChange: onValuesChange
    }, form);
  }, []);
  useEffect(function () {
    // 需要外部校验的情况，此时 submitting 还是 false
    if (outsideValidating === true) {
      Promise.resolve(beforeFinish(_objectSpread({
        data: submitData,
        schema: schema,
        errors: errorFields
      }, config))).then(function (error) {
        if (error) {
          setErrorFields(error);
        }

        endValidating();
      });
      return;
    } // 如果validation结束，submitting开始


    if (isValidating === false && isSubmitting === true) {
      endSubmitting();
      onFinish(submitData, errorFields);

      if (typeof logOnSubmit === 'function') {
        var start = sessionStorage.getItem('FORM_START');
        var mount = sessionStorage.getItem('FORM_MOUNT_TIME');
        var numberOfSubmits = Number(sessionStorage.getItem('NUMBER_OF_SUBMITS')) + 1;
        var end = new Date().getTime();
        var failedAttempts = Number(sessionStorage.getItem('FAILED_ATTEMPTS'));

        if (errorFields.length > 0) {
          failedAttempts = failedAttempts + 1;
        }

        var logParams = {
          formMount: yymmdd(mount),
          ms: end - start,
          duration: msToTime(end - start),
          numberOfSubmits: numberOfSubmits,
          failedAttempts: failedAttempts,
          url: location.href,
          formData: JSON.stringify(submitData),
          errors: JSON.stringify(errorFields),
          schema: JSON.stringify(schema)
        };

        if (id) {
          logParams.id = id;
        }

        logOnSubmit(logParams);
        sessionStorage.setItem('FORM_START', end);
        sessionStorage.setItem('NUMBER_OF_SUBMITS', numberOfSubmits);
        sessionStorage.setItem('FAILED_ATTEMPTS', failedAttempts);
      }
    }
  }, [isValidating, isSubmitting, outsideValidating]); // TODO: fk doesn't work

  var sizeCls = '';

  if (size === 'small') {
    sizeCls = 'fr-form-small';
  } else if (size === 'large') {
    sizeCls = 'fr-form-large';
  }

  var rootProps = {
    className: "fr-container ".concat(sizeCls, " ").concat(className || '')
  };

  if (style && _typeof(style) === 'object') {
    rootProps.style = style;
  }

  if (id && ['number', 'string'].indexOf(_typeof(id)) > -1) {
    rootProps.id = id;
  }

  var debugForm = getParamByName('_debug_form');
  var debugFormCss = getParamByName('_debug_form_css');
  var isPre = location.href.indexOf('pre') > -1;
  var watchList = Object.keys(watch);
  return /*#__PURE__*/React.createElement(StoreCtx.Provider, {
    value: store
  }, /*#__PURE__*/React.createElement(Store2Ctx.Provider, {
    value: store2
  }, /*#__PURE__*/React.createElement(Ctx.Provider, {
    value: tools
  }, /*#__PURE__*/React.createElement("div", rootProps, isPre && debugForm || debug ? /*#__PURE__*/React.createElement("div", {
    className: "mv2 bg-black-05 pa2 br2"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("span", null, "formData:"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      wordBreak: 'break-all',
      whiteSpace: 'pre-wrap',
      maxWidth: 600
    }
  }, JSON.stringify(form.formData, null, 4))), /*#__PURE__*/React.createElement("div", null, 'errorFields:' + JSON.stringify(form.errorFields)), /*#__PURE__*/React.createElement("div", null, 'touchedKeys:' + JSON.stringify(form.touchedKeys)), /*#__PURE__*/React.createElement("div", null, 'allTouched:' + JSON.stringify(form.allTouched)), /*#__PURE__*/React.createElement("div", null, 'descriptor:' + JSON.stringify(window.descriptor))) : null, watchList.length > 0 ? watchList.map(function (item, idx) {
    return /*#__PURE__*/React.createElement(Watcher, {
      key: idx.toString(),
      watchKey: item,
      watch: watch,
      formData: formData,
      firstMount: firstMount
    });
  }) : null, /*#__PURE__*/React.createElement(Core, {
    debugCss: isPre && debugFormCss || debugCss
  })))));
}

var Wrapper = function Wrapper(props) {
  var _ref2 = props || {},
      _ref2$isOldVersion = _ref2.isOldVersion,
      isOldVersion = _ref2$isOldVersion === void 0 ? true : _ref2$isOldVersion,
      schema = _ref2.schema,
      rest = _objectWithoutProperties(_ref2, _excluded3);

  var _schema = useRef(schema);

  if (isOldVersion) {
    _schema.current = updateSchemaToNewVersion(schema);
  }

  return /*#__PURE__*/React.createElement(App, _extends({
    schema: _schema.current
  }, rest));
};

export default Wrapper;