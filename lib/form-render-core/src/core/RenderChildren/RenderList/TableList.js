"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _ArrowDownOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/ArrowDownOutlined"));

var _ArrowUpOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/ArrowUpOutlined"));

require("antd/es/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/es/popconfirm"));

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../index"));

var _excluded = ["buttons"],
    _excluded2 = ["pagination"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FIELD_LENGTH = 170;

var TableList = function TableList(_ref) {
  var _ref$displayList = _ref.displayList,
      displayList = _ref$displayList === void 0 ? [] : _ref$displayList,
      dataIndex = _ref.dataIndex,
      children = _ref.children,
      deleteItem = _ref.deleteItem,
      copyItem = _ref.copyItem,
      addItem = _ref.addItem,
      moveItemUp = _ref.moveItemUp,
      moveItemDown = _ref.moveItemDown,
      flatten = _ref.flatten,
      schema = _ref.schema,
      listData = _ref.listData,
      changeList = _ref.changeList;
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

  var dataSource = displayList.map(function (item, idx) {
    return {
      index: idx
    };
  });
  var columns = children.map(function (child) {
    var item = flatten[child];
    var schema = item && item.schema || {};
    return _objectSpread({
      dataIndex: child,
      title: schema.required ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
        className: "fr-label-required"
      }, " *"), /*#__PURE__*/_react.default.createElement("span", null, schema.title)) : schema.title,
      width: FIELD_LENGTH,
      render: function render(value, record, index) {
        // Check: record.index 似乎是antd自己会给的，不错哦
        var childIndex = [].concat(_toConsumableArray(dataIndex), [record.index]);
        return /*#__PURE__*/_react.default.createElement(_index.default, {
          hideTitle: true,
          displayType: "inline",
          key: index.toString(),
          id: child,
          dataIndex: childIndex
        });
      }
    }, columnProps);
  });

  if (!props.hideDelete || !props.hideAdd || !props.hideCopy || !props.hideMove) {
    columns.push({
      title: '操作',
      key: '$action',
      fixed: 'right',
      width: 120,
      render: function render(value, record) {
        var idx = record.index;
        return /*#__PURE__*/_react.default.createElement("div", null, !props.hideAdd && !props.hideCopy && /*#__PURE__*/_react.default.createElement("a", {
          onClick: function onClick() {
            return copyItem(idx);
          }
        }, "\u590D\u5236"), !props.hideDelete && /*#__PURE__*/_react.default.createElement(_popconfirm.default, {
          title: "\u786E\u5B9A\u5220\u9664?",
          onConfirm: function onConfirm() {
            return deleteItem(idx);
          },
          okText: "\u786E\u5B9A",
          cancelText: "\u53D6\u6D88"
        }, /*#__PURE__*/_react.default.createElement("a", {
          style: {
            marginLeft: 8
          }
        }, "\u5220\u9664")), !props.hideMove && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ArrowUpOutlined2.default, {
          style: {
            color: '#1890ff',
            fontSize: 16,
            marginLeft: 8
          },
          onClick: function onClick() {
            return moveItemUp(idx);
          }
        }), /*#__PURE__*/_react.default.createElement(_ArrowDownOutlined2.default, {
          style: {
            color: '#1890ff',
            fontSize: 16,
            marginLeft: 8
          },
          onClick: function onClick() {
            return moveItemDown(idx);
          }
        })));
      }
    });
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-100 mb2 tr"
  }, !props.hideAdd && /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "primary",
    size: "small",
    onClick: addItem
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

    return /*#__PURE__*/_react.default.createElement(_button.default, {
      key: idx.toString(),
      style: {
        marginLeft: 8
      },
      size: "small",
      onClick: onClick
    }, /*#__PURE__*/_react.default.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: html || text
      }
    }));
  }) : null), /*#__PURE__*/_react.default.createElement(_table.default, _extends({
    scroll: {
      x: 'max-content'
    },
    columns: columns,
    dataSource: dataSource,
    rowKey: "index",
    size: "small",
    pagination: paginationConfig
  }, rest)));
};

var _default = TableList;
exports.default = _default;