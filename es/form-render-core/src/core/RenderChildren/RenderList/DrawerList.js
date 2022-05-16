import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/drawer/style";
import _Drawer from "antd/es/drawer";
import "antd/es/button/style";
import _Button from "antd/es/button";
import _ArrowDownOutlined from "@ant-design/icons/es/icons/ArrowDownOutlined";
import _ArrowUpOutlined from "@ant-design/icons/es/icons/ArrowUpOutlined";
import "antd/es/popconfirm/style";
import _Popconfirm from "antd/es/popconfirm";
var _excluded = ["buttons"],
    _excluded2 = ["pagination"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useRef } from 'react';
import { useSet, useTools } from '../../../hooks';
import { getDataPath, getDisplayValue, getKeyFromPath } from '../../../utils';
import Core from '../../index';
import ErrorMessage from '../../RenderField/ErrorMessage';
var FIELD_LENGTH = 170;

var DrawerList = function DrawerList(_ref) {
  var _extends2;

  var _ref$displayList = _ref.displayList,
      displayList = _ref$displayList === void 0 ? [] : _ref$displayList,
      dataPath = _ref.dataPath,
      children = _ref.children,
      deleteItem = _ref.deleteItem,
      addItem = _ref.addItem,
      moveItemDown = _ref.moveItemDown,
      moveItemUp = _ref.moveItemUp,
      flatten = _ref.flatten,
      errorFields = _ref.errorFields,
      getFieldsProps = _ref.getFieldsProps,
      schema = _ref.schema,
      changeList = _ref.changeList,
      listData = _ref.listData;

  var _useTools = useTools(),
      widgets = _useTools.widgets;

  var _schema$props = schema.props,
      props = _schema$props === void 0 ? {} : _schema$props,
      _schema$itemProps = schema.itemProps,
      itemProps = _schema$itemProps === void 0 ? {} : _schema$itemProps;

  var buttons = itemProps.buttons,
      columnProps = _objectWithoutProperties(itemProps, _excluded);

  var _props$pagination = props.pagination,
      pagination = _props$pagination === void 0 ? {} : _props$pagination,
      rest = _objectWithoutProperties(props, _excluded2);

  var paginationConfig = pagination && _objectSpread({
    size: 'small',
    hideOnSinglePage: true
  }, pagination);

  var currentIndex = useRef(-1);

  var _useSet = useSet({
    showDrawer: false
  }),
      _useSet2 = _slicedToArray(_useSet, 2),
      state = _useSet2[0],
      setState = _useSet2[1];

  var showDrawer = state.showDrawer;
  var dataSource = displayList.map(function (item, index) {
    return _objectSpread(_objectSpread({}, item), {}, {
      $idx: index
    });
  });
  var columns = children.map(function (child) {
    var item = flatten[child];
    var schema = item && item.schema || {};

    var _dataIndex = getKeyFromPath(child);

    return _objectSpread({
      dataIndex: _dataIndex,
      title: schema.required ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: "fr-label-required"
      }, " *"), /*#__PURE__*/React.createElement("span", null, schema.title)) : schema.title,
      width: FIELD_LENGTH,
      render: function render(value, record) {
        var childPath = getDataPath(child, [record.$idx]);
        var errorObj = errorFields.find(function (item) {
          return item.name == childPath;
        }) || {}; //TODO: 万一error在更深的层，这个办法是find不到的，会展示那一行没有提示。可以整一行加一个红线的方式处理

        var Widget = widgets[schema.readOnlyWidget];
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, Widget ? /*#__PURE__*/React.createElement(Widget, {
          value: value,
          schema: schema
        }) : getDisplayValue(value, schema)), errorObj.error && /*#__PURE__*/React.createElement(ErrorMessage, {
          message: errorObj.error,
          schema: schema
        }));
      }
    }, columnProps);
  });
  columns.push({
    title: '操作',
    key: '$action',
    fixed: 'right',
    width: 120,
    render: function render(value, record, idx) {
      var index = value && value.$idx || 0;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
        onClick: function onClick() {
          return openDrawer(index);
        }
      }, "\u7F16\u8F91"), !props.hideDelete && /*#__PURE__*/React.createElement(_Popconfirm, {
        title: "\u786E\u5B9A\u5220\u9664?",
        onConfirm: function onConfirm() {
          return deleteItem(index);
        },
        okText: "\u786E\u5B9A",
        cancelText: "\u53D6\u6D88"
      }, /*#__PURE__*/React.createElement("a", {
        style: {
          marginLeft: 8
        }
      }, "\u5220\u9664")), !props.hideMove && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_ArrowUpOutlined, {
        style: {
          color: '#1890ff',
          fontSize: 16,
          marginLeft: 8
        },
        onClick: function onClick() {
          return moveItemUp(index);
        }
      }), /*#__PURE__*/React.createElement(_ArrowDownOutlined, {
        style: {
          color: '#1890ff',
          fontSize: 16,
          marginLeft: 8
        },
        onClick: function onClick() {
          return moveItemDown(index);
        }
      })));
    }
  });
  var fieldsProps = getFieldsProps(currentIndex.current);

  var openDrawer = function openDrawer(index) {
    currentIndex.current = index;
    setState({
      showDrawer: true
    });
  };

  var closeDrawer = function closeDrawer() {
    currentIndex.current = -1;
    setState({
      showDrawer: false
    });
  };

  var handleAdd = function handleAdd() {
    var newIndex = addItem();
    openDrawer(newIndex);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "w-100 mb2 tr"
  }, !props.hideAdd && /*#__PURE__*/React.createElement(_Button, {
    type: "primary",
    size: "small",
    onClick: handleAdd
  }, "\u65B0\u589E"), Array.isArray(props.buttons) ? props.buttons.map(function (item, idx) {
    var callback = item.callback,
        text = item.text,
        html = item.html;

    var onClick = function onClick() {
      console.log({
        value: listData,
        onChange: changeList,
        schema: schema
      });
    };

    if (typeof window[callback] === 'function') {
      onClick = function onClick() {
        window[callback]({
          value: listData,
          onChange: changeList,
          schema: schema
        });
      };
    }

    return /*#__PURE__*/React.createElement(_Button, {
      key: idx.toString(),
      style: {
        marginLeft: 8
      },
      size: "small",
      onClick: onClick
    }, /*#__PURE__*/React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: html || text
      }
    }));
  }) : null), /*#__PURE__*/React.createElement(_Drawer, {
    width: "600",
    title: "\u7F16\u8F91",
    placement: "right",
    onClose: closeDrawer,
    visible: showDrawer,
    destroyOnClose: true // 必须要加，currentIndex不是一个state，Core不会重新渲染就跪了

  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-container"
  }, /*#__PURE__*/React.createElement(Core, fieldsProps))), /*#__PURE__*/React.createElement(_Table, _extends((_extends2 = {
    size: "small",
    scroll: {
      x: 'max-content'
    },
    columns: columns,
    dataSource: dataSource,
    rowClassName: function rowClassName(record, idx) {
      var index = record && record.$idx;
      var hasError = errorFields.find(function (item) {
        return item.name.indexOf("".concat(dataPath, "[").concat(index, "]")) > -1;
      });
      return hasError ? 'fr-row-error' : '';
    },
    rowKey: "$idx"
  }, _defineProperty(_extends2, "size", "small"), _defineProperty(_extends2, "pagination", paginationConfig), _extends2), rest)));
};

export default DrawerList;