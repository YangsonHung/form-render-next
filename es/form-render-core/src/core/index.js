var _excluded = ["id", "_item", "dataIndex", "hideTitle", "hideValidation", "debugCss"],
    _excluded2 = ["id", "item", "dataIndex", "dataPath", "hideTitle", "hideValidation", "debugCss", "schema", "_value", "dependValues", "displayType", "column", "labelWidth", "readOnly", "errorFields", "effectiveLabelWidth"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useRef } from 'react';
import { useStore, useStore2 } from '../hooks';
import { clone, getDataPath, getParentPath, getParentProps, getValueByPath, isCheckBoxType, isCssLength, isListType, isLooselyNumber, isObjType, parseRootValueInSchema } from '../utils';
import RenderList from './RenderChildren/RenderList';
import RenderObject from './RenderChildren/RenderObject';
import RenderField from './RenderField';

var Core = function Core(_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? '#' : _ref$id,
      _item = _ref._item,
      _ref$dataIndex = _ref.dataIndex,
      dataIndex = _ref$dataIndex === void 0 ? [] : _ref$dataIndex,
      _ref$hideTitle = _ref.hideTitle,
      hideTitle = _ref$hideTitle === void 0 ? false : _ref$hideTitle,
      _ref$hideValidation = _ref.hideValidation,
      hideValidation = _ref$hideValidation === void 0 ? false : _ref$hideValidation,
      debugCss = _ref.debugCss,
      rest = _objectWithoutProperties(_ref, _excluded);

  // console.log('<Core>', id);
  var snapShot = useRef();

  var _useStore = useStore(),
      flatten = _useStore.flatten,
      errorFields = _useStore.errorFields,
      isEditing = _useStore.isEditing,
      formData = _useStore.formData,
      allTouched = _useStore.allTouched;

  var _useStore2 = useStore2(),
      displayType = _useStore2.displayType,
      column = _useStore2.column,
      labelWidth = _useStore2.labelWidth,
      readOnly = _useStore2.readOnly;

  var item = _item ? _item : flatten[id];
  if (!item) return null;
  var dataPath = getDataPath(id, dataIndex);
  var parentPath = getParentPath(dataPath);

  var _value = getValueByPath(formData, dataPath);

  var schema = clone(item.schema);
  var dependencies = schema.dependencies;
  var dependValues = [];
  var rootValue;

  try {
    if (Array.isArray(dependencies)) {
      dependencies.forEach(function (item) {
        var itemPath = getDataPath(item, dataIndex);
        var result = getValueByPath(formData, itemPath);
        dependValues.push(result);
      });
    }
  } catch (error) {
    console.error("dependencies \u8BA1\u7B97\u62A5\u9519\uFF0C".concat(dependencies));
  }

  try {
    rootValue = getValueByPath(formData, parentPath);
  } catch (error) {} // 节流部分逻辑，编辑时不执行


  if (isEditing && snapShot.current) {
    schema = snapShot.current;
  } else {
    if (JSON.stringify(schema).indexOf('rootValue') > -1) {
      schema = parseRootValueInSchema(schema, rootValue);
    }

    snapShot.current = schema;
  } // 真正有效的label宽度需要从现在所在item开始一直往上回溯（设计成了继承关系），找到的第一个有值的 ui:labelWidth


  var effectiveLabelWidth = getParentProps('labelWidth', id, flatten) || labelWidth;

  var dataProps = _objectSpread({
    id: id,
    item: item,
    // 如果直接传了item，就不用id去取item, 暂时是内部属性，不外用
    dataIndex: dataIndex,
    // 数据来源是数组的第几个index，上层每有一个list，就push一个index
    dataPath: dataPath,
    _value: _value,
    dependValues: dependValues,
    hideTitle: hideTitle,
    hideValidation: hideValidation,
    debugCss: debugCss,
    schema: schema,
    displayType: displayType,
    column: column,
    labelWidth: labelWidth,
    readOnly: readOnly,
    errorFields: errorFields,
    effectiveLabelWidth: effectiveLabelWidth,
    allTouched: allTouched
  }, rest);

  return /*#__PURE__*/React.createElement(CoreRender, dataProps);
};

var CoreRender = function CoreRender(_ref2) {
  var id = _ref2.id,
      item = _ref2.item,
      dataIndex = _ref2.dataIndex,
      dataPath = _ref2.dataPath,
      hideTitle = _ref2.hideTitle,
      hideValidation = _ref2.hideValidation,
      debugCss = _ref2.debugCss,
      schema = _ref2.schema,
      _value = _ref2._value,
      dependValues = _ref2.dependValues,
      displayType = _ref2.displayType,
      column = _ref2.column,
      labelWidth = _ref2.labelWidth,
      readOnly = _ref2.readOnly,
      errorFields = _ref2.errorFields,
      effectiveLabelWidth = _ref2.effectiveLabelWidth,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  if (schema.hidden) {
    return null;
  } // 样式的逻辑全放在这层
  // displayType 一层层网上找值


  var _displayType = schema.displayType || rest.displayType || displayType || 'column';

  var isList = isListType(schema);
  var isObj = isObjType(schema);
  var isComplex = isObj || isList;
  var isCheckBox = isCheckBoxType(schema, readOnly);
  var width = schema.width || schema['ui:width'];
  var containerClass = "fr-field ".concat(_displayType === 'inline' ? '' : 'w-100', " flex");
  var labelClass = "fr-label";
  var contentClass = "fr-content";

  if (typeof schema.className === 'string') {
    containerClass += ' ' + schema.className;
  } // common classNames dispite row or column


  switch (schema.type) {
    case 'object':
      if (isObj) {
        if (schema.title) {
          labelClass += ' fr-label-object';
        }

        containerClass += ' fr-field-object';
      }

      break;

    case 'array':
      // list 有两种展示形式！
      if (isList) {
        if (schema.title) {
          labelClass += ' fr-label-list';
        }

        containerClass += ' fr-field-column';
      }

      break;

    case 'boolean':
      if (isCheckBox) {
        contentClass += ' fr-content-column'; // checkbox高度短，需要居中对齐

        containerClass += " flex ".concat(_displayType === 'column' ? 'flex-column' : '');
      }

      break;

    default:
  } // column specific className


  if (!isComplex && !isCheckBox) {
    if (_displayType === 'column') {
      containerClass += ' flex-column';
      labelClass += ' fr-label-column';
      contentClass += ' fr-content-column';

      switch (schema.type) {
        case 'object':
          break;

        case 'array':
          if (schema.title && !schema.enum) {// labelClass += ' b mb2';
          }

          break;

        case 'boolean':
          break;

        default:
      }
    } else if (_displayType === 'row') {
      // row specific className
      containerClass += '';
      labelClass += ' fr-label-row';
      contentClass += ' fr-content-row';

      if (!isObj && !isCheckBox) {
        labelClass += ' flex-shrink-0 fr-label-row';
        contentClass += ' flex-grow-1 relative';
      }
    }
  } // style part


  var columnStyle = {};

  if (schema.hidden) {
    columnStyle.display = 'none';
  } // if (!isComplex) {
  // }


  if (!isObj) {
    if (width) {
      columnStyle.width = width;
      columnStyle.paddingRight = 8;
    } else if (column > 1) {
      columnStyle.width = "calc(100% /".concat(column, ")");
      columnStyle.paddingRight = 8;
    }
  }

  var _labelWidth = isLooselyNumber(effectiveLabelWidth) ? Number(effectiveLabelWidth) : isCssLength(effectiveLabelWidth) ? effectiveLabelWidth : 110; // 默认是 110px 的长度


  var labelStyle = {
    width: _labelWidth
  };

  if (isComplex || _displayType === 'column') {
    labelStyle = {
      flexGrow: 1
    };
  }

  if (_displayType === 'inline') {
    labelStyle = {
      marginTop: 5,
      paddingLeft: 12
    };
    labelClass = '';
    contentClass += ' fr-content-inline';

    if (containerClass.indexOf('fr-field-object') === -1) {
      containerClass += ' fr-field-inline';
    }
  }

  var hasChildren = item.children && item.children.length > 0;
  var fieldProps = {
    $id: id,
    dataIndex: dataIndex,
    dataPath: dataPath,
    _value: _value,
    dependValues: dependValues,
    _schema: schema,
    labelClass: labelClass,
    labelStyle: labelStyle,
    contentClass: contentClass,
    errorFields: errorFields,
    // 层级间可使用的字段
    displayType: _displayType,
    hideTitle: hideTitle,
    hideValidation: hideValidation
  };
  var objChildren = /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap"
  }, /*#__PURE__*/React.createElement(RenderObject, {
    dataIndex: dataIndex,
    errorFields: errorFields,
    displayType: _displayType,
    hideTitle: hideTitle
  }, item.children));
  var listChildren = /*#__PURE__*/React.createElement(RenderList, {
    parentId: id,
    schema: schema,
    dataIndex: dataIndex,
    errorFields: errorFields,
    displayType: _displayType,
    hideTitle: hideTitle
  }, item.children); // 计算 children

  var _children = null;

  if (hasChildren) {
    if (isObj) {
      _children = objChildren;
    } else if (isList) {
      _children = listChildren;
    }
  } else if (isCheckBox) {
    _children = schema.title;
  }

  return /*#__PURE__*/React.createElement("div", {
    style: columnStyle,
    className: "".concat(containerClass, " ").concat(debugCss ? 'debug' : '')
  }, /*#__PURE__*/React.createElement(RenderField, fieldProps, _children));
}; // haven't used


var areEqual = function areEqual(prev, current) {
  if (prev.allTouched !== current.allTouched) {
    return false;
  }

  if (prev.displayType !== current.displayType) {
    return false;
  }

  if (prev.column !== current.column) {
    return false;
  }

  if (prev.labelWidth !== current.labelWidth) {
    return false;
  }

  if (prev.readOnly !== current.readOnly) {
    return false;
  }

  if (prev.disabled !== current.disabled) {
    return false;
  }

  if (prev.schema && current.schema) {
    if (prev.schema.$id === '#') {
      return false;
    }
  }

  if (isObjType(prev.schema) && isObjType(current.schema)) {
    return false;
  }

  if (JSON.stringify(prev.dependValues) !== JSON.stringify(current.dependValues)) {
    return false;
  }

  if (JSON.stringify(prev._value) === JSON.stringify(current._value) && JSON.stringify(prev.schema) === JSON.stringify(current.schema) && JSON.stringify(prev.errorFields) === JSON.stringify(current.errorFields)) {
    return true;
  }

  return false;
};

export default Core;