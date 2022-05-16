import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/popconfirm/style";
import _Popconfirm from "antd/es/popconfirm";
import _CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import _CopyOutlined from "@ant-design/icons/es/icons/CopyOutlined";
import _ArrowDownOutlined from "@ant-design/icons/es/icons/ArrowDownOutlined";
import _ArrowUpOutlined from "@ant-design/icons/es/icons/ArrowUpOutlined";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import React from 'react';
import Core from '../../index';

var CardList = function CardList(_ref) {
  var _ref$displayList = _ref.displayList,
      displayList = _ref$displayList === void 0 ? [] : _ref$displayList,
      listData = _ref.listData,
      changeList = _ref.changeList,
      schema = _ref.schema,
      deleteItem = _ref.deleteItem,
      copyItem = _ref.copyItem,
      addItem = _ref.addItem,
      moveItemUp = _ref.moveItemUp,
      moveItemDown = _ref.moveItemDown,
      displayType = _ref.displayType,
      getFieldsProps = _ref.getFieldsProps;
  var _schema$props = schema.props,
      props = _schema$props === void 0 ? {} : _schema$props,
      itemProps = schema.itemProps;
  var addBtnProps = {
    type: 'dashed',
    children: '新增一条'
  };

  if (props.addBtnProps && _typeof(props.addBtnProps) === 'object') {
    addBtnProps = _objectSpread(_objectSpread({}, addBtnProps), props.addBtnProps);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fr-card-list"
  }, displayList.map(function (item, idx) {
    var fieldsProps = getFieldsProps(idx);
    fieldsProps.displayType = displayType;
    return /*#__PURE__*/React.createElement("div", {
      className: "fr-card-item ".concat(displayType === 'row' ? 'fr-card-item-row' : ''),
      key: idx
    }, /*#__PURE__*/React.createElement("div", {
      className: "fr-card-index"
    }, idx + 1), /*#__PURE__*/React.createElement(Core, fieldsProps), /*#__PURE__*/React.createElement("div", {
      direction: "horizontal",
      className: "fr-card-toolbar"
    }, !props.hideMove && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_ArrowUpOutlined, {
      style: {
        fontSize: 16,
        marginLeft: 4
      },
      onClick: function onClick() {
        return moveItemUp(idx);
      }
    }), /*#__PURE__*/React.createElement(_ArrowDownOutlined, {
      style: {
        fontSize: 16,
        marginLeft: 4
      },
      onClick: function onClick() {
        return moveItemDown(idx);
      }
    })), !props.hideAdd && !props.hideCopy && /*#__PURE__*/React.createElement(_CopyOutlined, {
      style: {
        fontSize: 16,
        marginLeft: 8
      },
      onClick: function onClick() {
        return copyItem(idx);
      }
    }), !props.hideDelete && /*#__PURE__*/React.createElement(_Popconfirm, {
      title: "\u786E\u5B9A\u5220\u9664?",
      onConfirm: function onConfirm() {
        return deleteItem(idx);
      },
      okText: "\u786E\u5B9A",
      cancelText: "\u53D6\u6D88"
    }, /*#__PURE__*/React.createElement(_CloseOutlined, {
      style: {
        fontSize: 16,
        marginLeft: 8
      }
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: displayList.length > 0 ? 0 : 8
    }
  }, !props.hideAdd && /*#__PURE__*/React.createElement(_Button, _extends({
    onClick: addItem
  }, addBtnProps)), Array.isArray(props.buttons) ? props.buttons.map(function (item, idx) {
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
      type: "dashed",
      onClick: onClick
    }, /*#__PURE__*/React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: html || text
      }
    }));
  }) : null));
};

export default CardList;