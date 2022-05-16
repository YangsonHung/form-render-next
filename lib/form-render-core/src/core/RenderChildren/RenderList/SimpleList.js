"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _ArrowDownOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/ArrowDownOutlined"));

var _ArrowUpOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/ArrowUpOutlined"));

var _CopyOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/CopyOutlined"));

require("antd/es/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/es/popconfirm"));

var _DeleteOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/DeleteOutlined"));

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var SimpleList = function SimpleList(_ref) {
  var schema = _ref.schema,
      _ref$displayList = _ref.displayList,
      displayList = _ref$displayList === void 0 ? [] : _ref$displayList,
      listData = _ref.listData,
      changeList = _ref.changeList,
      deleteItem = _ref.deleteItem,
      addItem = _ref.addItem,
      copyItem = _ref.copyItem,
      moveItemUp = _ref.moveItemUp,
      moveItemDown = _ref.moveItemDown,
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

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "fr-list-1"
  }, displayList.map(function (item, idx) {
    var fieldsProps = getFieldsProps(idx);
    fieldsProps.displayType = 'inline';

    if (props.hideTitle) {
      fieldsProps.hideTitle = true;
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      key: idx,
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/_react.default.createElement(_index.default, fieldsProps), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginTop: 6
      }
    }, !props.hideDelete && /*#__PURE__*/_react.default.createElement(_popconfirm.default, {
      title: "\u786E\u5B9A\u5220\u9664?",
      onConfirm: function onConfirm() {
        return deleteItem(idx);
      },
      okText: "\u786E\u5B9A",
      cancelText: "\u53D6\u6D88"
    }, /*#__PURE__*/_react.default.createElement(_DeleteOutlined2.default, {
      style: {
        fontSize: 17,
        marginLeft: 8
      }
    })), !props.hideAdd && !props.hideCopy && /*#__PURE__*/_react.default.createElement(_CopyOutlined2.default, {
      style: {
        fontSize: 15,
        marginLeft: 8
      },
      onClick: function onClick() {
        return copyItem(idx);
      }
    }), !props.hideMove && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ArrowUpOutlined2.default, {
      style: {
        fontSize: 16,
        marginLeft: 8
      },
      onClick: function onClick() {
        return moveItemUp(idx);
      }
    }), /*#__PURE__*/_react.default.createElement(_ArrowDownOutlined2.default, {
      style: {
        fontSize: 16,
        marginLeft: 8
      },
      onClick: function onClick() {
        return moveItemDown(idx);
      }
    }))));
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: displayList.length > 0 ? 0 : 8
    }
  }, !props.hideAdd && /*#__PURE__*/_react.default.createElement(_button.default, _extends({
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

    return /*#__PURE__*/_react.default.createElement(_button.default, {
      key: idx.toString(),
      style: {
        marginLeft: 8
      },
      type: "dashed",
      onClick: onClick
    }, /*#__PURE__*/_react.default.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: html || text
      }
    }));
  }) : null));
};

var _default = SimpleList;
exports.default = _default;