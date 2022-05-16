function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable jsx-a11y/anchor-is-valid */
import { get } from 'lodash-es';
import React from 'react';
import { useStore, useTools } from '../../../hooks';
import { generateDataSkeleton, getDataPath, getSchemaFromFlatten } from '../../../utils';
import CardList from './CardList';
import DrawerList from './DrawerList';
import "./list.css";
import SimpleList from './SimpleList';
import TableList from './TableList';
import TabList from './TabList';
import VirtualList from './VirtualList';

var RenderList = function RenderList(_ref) {
  var parentId = _ref.parentId,
      _ref$schema = _ref.schema,
      schema = _ref$schema === void 0 ? {} : _ref$schema,
      _ref$dataIndex = _ref.dataIndex,
      dataIndex = _ref$dataIndex === void 0 ? [] : _ref$dataIndex,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? [] : _ref$children,
      errorFields = _ref.errorFields,
      displayType = _ref.displayType;

  var _useStore = useStore(),
      formData = _useStore.formData,
      flatten = _useStore.flatten;

  var _useTools = useTools(),
      onItemChange = _useTools.onItemChange,
      removeTouched = _useTools.removeTouched;

  var renderWidget = 'list';

  try {
    renderWidget = schema.widget;
  } catch (error) {} // 计算 list对应的formData


  var dataPath = getDataPath(parentId, dataIndex);
  var listData;

  if (typeof dataPath === 'string') {
    // TODO: listData会有不少“窟窿”，submit 的时候，listData 需要补齐 or filter
    listData = get(formData, dataPath);
  }

  var displayList = Array.isArray(listData) ? listData : [{}];

  var changeList = function changeList(newList) {
    onItemChange(dataPath, newList);
  };

  var addItem = function addItem() {
    var _schema = getSchemaFromFlatten(flatten, parentId);

    var newItem = generateDataSkeleton(_schema.items) || {};
    var newList = [].concat(_toConsumableArray(displayList), [newItem]);
    var newIndex = newList.length - 1;
    onItemChange(dataPath, newList);
    return newIndex;
  };

  var copyItem = function copyItem(idx) {
    var newItem = displayList[idx];
    var newList = [].concat(_toConsumableArray(displayList.slice(0, idx)), [newItem], _toConsumableArray(displayList.slice(idx)));
    onItemChange(dataPath, JSON.parse(JSON.stringify(newList)));
  };

  var deleteItem = function deleteItem(idx) {
    // TODO: 删除元素的时候，也需要delete相对于的校验信息（errorFields）
    // remark: 删除时，不存在的item需要补齐，用null
    var newList = displayList.filter(function (item, kdx) {
      return kdx !== idx;
    });
    onItemChange(dataPath, newList);
    removeTouched("".concat(dataPath, "[").concat(idx, "]"));
  }; //TODO1: 上线翻页要正确！！现在是错的


  var moveItemUp = function moveItemUp(idx) {
    if (idx === 0) return;
    var currentItem = displayList[idx];
    var itemAbove = displayList[idx - 1];
    var newList = displayList;
    newList[idx] = itemAbove;
    newList[idx - 1] = currentItem;
    onItemChange(dataPath, newList); // TODO: 这块懒了，之后要处理一下

    removeTouched("".concat(dataPath, "[").concat(idx, "]"));
  };

  var moveItemDown = function moveItemDown(idx) {
    if (idx >= displayList.length - 1) return;
    var currentItem = displayList[idx];
    var itemBelow = displayList[idx + 1];
    var newList = displayList;
    newList[idx] = itemBelow;
    newList[idx + 1] = currentItem;
    onItemChange(dataPath, newList); // TODO: 这块懒了，之后要处理一下

    removeTouched("".concat(dataPath, "[").concat(idx, "]"));
  };

  var itemSchema = {
    type: 'object',
    properties: {},
    props: schema.props || {},
    $id: schema.$id
  };
  var itemFlatten = {
    schema: itemSchema,
    children: children
  };

  var getFieldsProps = function getFieldsProps(idx, extraProps) {
    return _objectSpread({
      _item: itemFlatten,
      dataIndex: [].concat(_toConsumableArray(dataIndex), [idx])
    }, extraProps);
  };

  var displayProps = {
    displayList: displayList,
    changeList: changeList,
    schema: schema,
    dataPath: dataPath,
    dataIndex: dataIndex,
    children: children,
    deleteItem: deleteItem,
    addItem: addItem,
    copyItem: copyItem,
    moveItemDown: moveItemDown,
    moveItemUp: moveItemUp,
    listData: listData,
    flatten: flatten,
    errorFields: errorFields,
    displayType: displayType,
    getFieldsProps: getFieldsProps
  };

  switch (renderWidget) {
    case 'list0':
    case 'cardList':
      return /*#__PURE__*/React.createElement(CardList, displayProps);

    case 'list1':
    case 'simpleList':
      return /*#__PURE__*/React.createElement(SimpleList, displayProps);

    case 'list2':
    case 'tableList':
      return /*#__PURE__*/React.createElement(TableList, displayProps);

    case 'list3':
    case 'drawerList':
      return /*#__PURE__*/React.createElement(DrawerList, displayProps);

    case 'list4':
    case 'virtualList':
      return /*#__PURE__*/React.createElement(VirtualList, displayProps);

    case 'tabList':
      return /*#__PURE__*/React.createElement(TabList, displayProps);

    default:
      return /*#__PURE__*/React.createElement(CardList, displayProps);
  }
};

export default RenderList;