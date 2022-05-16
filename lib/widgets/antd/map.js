"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Map;

require("antd/es/collapse/style");

var _collapse = _interopRequireDefault(require("antd/es/collapse"));

var _react = _interopRequireWildcard(require("react"));

var _excluded = ["children", "title", "schema"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// import { useStore2 } from '../../hooks';
var Panel = _collapse.default.Panel;

function Map(_ref) {
  var children = _ref.children,
      title = _ref.title,
      schema = _ref.schema,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _ref2 = {},
      theme = _ref2.theme,
      displayType = _ref2.displayType,
      allCollapsed = _ref2.allCollapsed; // TODO!

  var _useState = (0, _react.useState)(schema.collapsed || false),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1]; // useEffect(() => {
  //   setCollapsed(allCollapsed);
  // }, [allCollapsed]);


  (0, _react.useEffect)(function () {
    if (schema.hasOwnProperty('collapsed')) {
      setCollapsed(schema.collapsed);
    }
  }, [schema.collapsed]);

  if (!title) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "w-100"
    }, children);
  } // if (theme == '1') {
  //   return (
  //     <div className="w-100">
  //       <div
  //         style={{
  //           fontSize: 17,
  //           fontWeight: 500,
  //           paddingBottom: 4,
  //           borderBottom: '1px solid rgba( 0, 0, 0, .2 )',
  //           marginBottom: 16,
  //         }}
  //       >
  //         {title}
  //       </div>
  //       <div style={{ marginLeft: displayType == 'row' ? 0 : 12 }}>
  //         {children}
  //       </div>
  //     </div>
  //   );
  // }
  // 新增卡片视图
  // if (theme == '2') {
  //   const { id } = rest.schema;
  //   return (
  //     <div class="fr-theme-card-wrap">
  //       <div>
  //         {/* title 容器的 id，用来加锚点用 */}
  //         <div id={id || title} class="fr-theme-card-title">
  //           {title}
  //         </div>
  //         <div style={{ marginLeft: displayType == 'row' ? 0 : 12 }}>
  //           {children}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }


  var toggle = function toggle(keyList) {
    if (keyList.length > 0) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-100"
  }, /*#__PURE__*/_react.default.createElement(_collapse.default, {
    activeKey: collapsed ? [] : ['1'],
    onChange: toggle
  }, /*#__PURE__*/_react.default.createElement(Panel, {
    header: /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 500
      }
    }, title, /*#__PURE__*/_react.default.createElement("span", {
      className: "fr-desc ml2"
    }, (schema === null || schema === void 0 ? void 0 : schema.description) ? "( ".concat(schema.description, " )") : '')),
    key: "1",
    className: "fr-collapse-object"
  }, children)));
} // export default function map({ children, title }) {
//   return <div className="w-100">{children}</div>;
// }