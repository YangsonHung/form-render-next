"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPromiseFinish = allPromiseFinish;
exports.clone = exports.cleanEmpty = void 0;
exports.combineSchema = combineSchema;
exports.dataToKeys = exports.completeSchemaWithTheme = void 0;
exports.defaultGetValueFromEvent = defaultGetValueFromEvent;
exports.destructDataPath = destructDataPath;
exports.evaluateString = void 0;
exports.flattenSchema = flattenSchema;
exports.generateDataSkeleton = void 0;
exports.getDataPath = getDataPath;
exports.getKeyFromPath = exports.getEnum = exports.getDisplayValue = exports.getDescriptorSimple = void 0;
exports.getParamByName = getParamByName;
exports.getParentPath = getParentPath;
exports.getSaveNumber = exports.getParentProps = void 0;
exports.getSchemaFromFlatten = getSchemaFromFlatten;
exports.getValueByPath = getValueByPath;
exports.hasRepeat = hasRepeat;
exports.isCheckBoxType = isCheckBoxType;
exports.isCssLength = isCssLength;
exports.isDeepEqual = isDeepEqual;
exports.isEmail = void 0;
exports.isExpression = isExpression;
exports.isFunctionSchema = isFunctionSchema;
exports.isFunctionString = void 0;
exports.isListType = isListType;
exports.isLooselyNumber = isLooselyNumber;
exports.isObjType = isObjType;
exports.isObject = void 0;
exports.looseJsonParse = looseJsonParse;
exports.msToTime = msToTime;
exports.parseAllExpression = exports.oldSchemaToNew = exports.newSchemaToOld = void 0;
exports.parseFunction = parseFunction;
exports.parseRootValueInSchema = exports.parseFunctionString = void 0;
exports.parseSingleExpression = parseSingleExpression;
exports.updateSchemaToNewVersion = exports.translateMessage = exports.schemaContainsExpression = exports.removeHiddenFromResult = exports.removeEmptyItemFromList = exports.removeDups = exports.parseString = exports.parseSingleRootValue = void 0;
exports.yymmdd = yymmdd;

var _lodashEs = require("lodash-es");

var _excluded = ["propsSchema"],
    _excluded2 = ["schema"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getParamByName(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
} // export function isUrl(string) {
//   const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
//   // const domainRE = /^[^\s\.]+\.\S{2,}$/;
//   if (typeof string !== 'string') return false;
//   return protocolRE.test(string);
// }


function isCheckBoxType(schema, readOnly) {
  if (readOnly) return false;
  if (schema.widget === 'checkbox') return true;

  if (schema && schema.type === 'boolean') {
    if (schema.enum) return false;
    if (schema.widget === undefined) return true;
    return false;
  }
} // a[].b.c => a.b.c


function removeBrackets(string) {
  if (typeof string === 'string') {
    return string.replace(/\[\]/g, '');
  } else {
    return string;
  }
}

function getParentPath(path) {
  if (typeof path === 'string') {
    var pathArr = path.split('.');

    if (pathArr.length === 1) {
      return '#';
    }

    pathArr.pop();
    return pathArr.join('.');
  }

  return '#';
}

function getValueByPath(formData, path) {
  if (path === '#' || !path) {
    return formData || {};
  } else if (typeof path === 'string') {
    return (0, _lodashEs.get)(formData, path);
  } else {
    console.error('path has to be a string');
  }
} //  path: 'a.b[1].c[0]' => { id: 'a.b[].c[]'  dataIndex: [1,0] }


function destructDataPath(path) {
  var id;
  var dataIndex;

  if (path === '#') {
    return {
      id: '#',
      dataIndex: []
    };
  }

  if (typeof path !== 'string') {
    throw Error("path ".concat(path, " is not a string!!! Something wrong here"));
  }

  var pattern = /\[[0-9]+\]/g;
  var matchList = path.match(pattern);

  if (!matchList) {
    id = path;
  } else {
    id = path.replace(pattern, '[]'); // 这个是match下来的结果，可安全处理

    dataIndex = matchList.map(function (item) {
      return Number(item.substring(1, item.length - 1));
    });
  }

  return {
    id: id,
    dataIndex: dataIndex
  };
} // id: 'a.b[].c[]'  dataIndex: [1,0] =>  'a.b[1].c[0]'


function getDataPath(id, dataIndex) {
  if (id === '#') {
    return id;
  }

  if (typeof id !== 'string') {
    throw Error("id ".concat(id, " is not a string!!! Something wrong here"));
  }

  var _id = id;

  if (Array.isArray(dataIndex)) {
    // const matches = id.match(/\[\]/g) || [];
    // const count = matches.length;
    dataIndex.forEach(function (item) {
      _id = _id.replace(/\[\]/, "[".concat(item, "]"));
    });
  }

  return removeBrackets(_id);
}

function isObjType(schema) {
  return schema && schema.type === 'object' && schema.properties && !schema.widget;
} // TODO: to support case that item is not an object


function isListType(schema) {
  return schema && schema.type === 'array' && isObjType(schema.items) && schema.enum === undefined;
} // TODO: more tests to make sure weird & wrong schema won't crush


function flattenSchema() {
  var _schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#';
  var parent = arguments.length > 2 ? arguments[2] : undefined;
  var result = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var schema = clone(_schema);
  var _name = name;

  if (!schema.$id) {
    schema.$id = _name; // path as $id, for easy access to path in schema
  }

  var children = [];

  if (isObjType(schema)) {
    Object.entries(schema.properties).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      var _key = isListType(value) ? key + '[]' : key;

      var uniqueName = _name === '#' ? _key : _name + '.' + _key;
      children.push(uniqueName);
      flattenSchema(value, uniqueName, _name, result);
    });
    schema.properties = {};
  }

  if (isListType(schema)) {
    Object.entries(schema.items.properties).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      var _key = isListType(value) ? key + '[]' : key;

      var uniqueName = _name === '#' ? _key : _name + '.' + _key;
      children.push(uniqueName);
      flattenSchema(value, uniqueName, _name, result);
    });
    schema.items.properties = {};
  }

  if (schema.type) {
    result[_name] = {
      parent: parent,
      schema: schema,
      children: children
    };
  }

  return result;
}

function getSchemaFromFlatten(flatten) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#';
  var schema = {};
  var item = clone(flatten[path]);

  if (item) {
    schema = item.schema; // schema.$id && delete schema.$id;

    if (item.children.length > 0) {
      item.children.forEach(function (child) {
        if (!flatten[child]) return;
        var key = getKeyFromPath(child);

        if (isObjType(schema)) {
          schema.properties[key] = getSchemaFromFlatten(flatten, child);
        }

        if (isListType(schema)) {
          schema.items.properties[key] = getSchemaFromFlatten(flatten, child);
        }
      });
    }
  }

  return schema;
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

var isObject = function isObject(a) {
  return stringContains(Object.prototype.toString.call(a), 'Object');
};

exports.isObject = isObject;
var clone = _lodashEs.cloneDeep; // '3' => true, 3 => true, undefined => false

exports.clone = clone;

function isLooselyNumber(num) {
  if (typeof num === 'number') return true;

  if (typeof num === 'string') {
    return !Number.isNaN(Number(num));
  }

  return false;
}

function isCssLength(str) {
  if (typeof str !== 'string') return false;
  return str.match(/^([0-9])*(%|px|rem|em)$/i);
}

function isDeepEqual(param1, param2) {
  if (param1 === undefined && param2 === undefined) return true;else if (param1 === undefined || param2 === undefined) return false;
  if (param1 === null && param2 === null) return true;else if (param1 === null || param2 === null) return false;else if (param1.constructor !== param2.constructor) return false;

  if (param1.constructor === Array) {
    if (param1.length !== param2.length) return false;

    for (var i = 0; i < param1.length; i++) {
      if (param1[i].constructor === Array || param1[i].constructor === Object) {
        if (!isDeepEqual(param1[i], param2[i])) return false;
      } else if (param1[i] !== param2[i]) return false;
    }
  } else if (param1.constructor === Object) {
    if (Object.keys(param1).length !== Object.keys(param2).length) return false;

    for (var _i2 = 0; _i2 < Object.keys(param1).length; _i2++) {
      var key = Object.keys(param1)[_i2];

      if (param1[key] && typeof param1[key] !== 'number' && (param1[key].constructor === Array || param1[key].constructor === Object)) {
        if (!isDeepEqual(param1[key], param2[key])) return false;
      } else if (param1[key] !== param2[key]) return false;
    }
  } else if (param1.constructor === String || param1.constructor === Number) {
    return param1 === param2;
  }

  return true;
} // export function getFormat(format) {
//   let dateFormat;
//   switch (format) {
//     case 'date':
//       dateFormat = 'YYYY-MM-DD';
//       break;
//     case 'time':
//       dateFormat = 'HH:mm:ss';
//       break;
//     case 'dateTime':
//       dateFormat = 'YYYY-MM-DD HH:mm:ss';
//       break;
//     case 'week':
//       dateFormat = 'YYYY-w';
//       break;
//     case 'year':
//       dateFormat = 'YYYY';
//       break;
//     case 'quarter':
//       dateFormat = 'YYYY-Q';
//       break;
//     case 'month':
//       dateFormat = 'YYYY-MM';
//       break;
//     default:
//       // dateTime
//       if (typeof format === 'string') {
//         dateFormat = format;
//       } else {
//         dateFormat = 'YYYY-MM-DD';
//       }
//   }
//   return dateFormat;
// }


function hasRepeat(list) {
  return list.find(function (x, i, self) {
    return i !== self.findIndex(function (y) {
      return JSON.stringify(x) === JSON.stringify(y);
    });
  });
}

function combineSchema() {
  var propsSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var uiSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var propList = getChildren(propsSchema);
  var newList = propList.map(function (p) {
    var name = p.name;
    var _p$schema = p.schema,
        type = _p$schema.type,
        options = _p$schema.enum,
        properties = _p$schema.properties,
        items = _p$schema.items;
    var isObj = type === 'object' && properties;
    var isArr = type === 'array' && items && !options; // enum + array 代表的多选框，没有sub

    var ui = name && uiSchema[p.name];

    if (!ui) {
      return p;
    } // 如果是list，递归合并items


    if (isArr) {
      var newItems = combineSchema(items, ui.items || {});
      return _objectSpread(_objectSpread({}, p), {}, {
        schema: _objectSpread(_objectSpread(_objectSpread({}, p.schema), ui), {}, {
          items: newItems
        })
      });
    } // object递归合并整个schema


    if (isObj) {
      var newSchema = combineSchema(p.schema, ui);
      return _objectSpread(_objectSpread({}, p), {}, {
        schema: newSchema
      });
    }

    return _objectSpread(_objectSpread({}, p), {}, {
      schema: _objectSpread(_objectSpread({}, p.schema), ui)
    });
  });
  var newObj = {};
  newList.forEach(function (s) {
    newObj[s.name] = s.schema;
  });
  var topLevelUi = {};
  Object.keys(uiSchema).forEach(function (key) {
    if (typeof key === 'string' && key.substring(0, 3) === 'ui:') {
      topLevelUi[key] = uiSchema[key];
    }
  });

  if ((0, _lodashEs.isEmpty)(newObj)) {
    return _objectSpread(_objectSpread({}, propsSchema), topLevelUi);
  }

  return _objectSpread(_objectSpread(_objectSpread({}, propsSchema), topLevelUi), {}, {
    properties: newObj
  });
} // export function isEmpty(obj) {
//   return Object.keys(obj).length === 0;
// }


function getChildren(schema) {
  if (!schema) return [];
  var properties = schema.properties,
      items = schema.items,
      type = schema.type;

  if (!properties && !items) {
    return [];
  }

  var schemaSubs = {};

  if (type === 'object') {
    schemaSubs = properties;
  }

  if (type === 'array') {
    schemaSubs = items;
  }

  return Object.keys(schemaSubs).map(function (name) {
    return {
      schema: schemaSubs[name],
      name: name
    };
  });
}

var parseString = function parseString(string) {
  return Function('"use strict";return (' + string + ')')();
};

exports.parseString = parseString;

var evaluateString = function evaluateString(string, formData, rootValue) {
  return Function("\"use strict\";\n    const rootValue = ".concat(JSON.stringify(rootValue), ";\n    const formData = ").concat(JSON.stringify(formData), ";\n    return (").concat(string, ")"))();
};

exports.evaluateString = evaluateString;

function isExpression(func) {
  // if (typeof func === 'function') {
  //   const funcString = func.toString();
  //   return (
  //     funcString.indexOf('formData') > -1 ||
  //     funcString.indexOf('rootValue') > -1
  //   );
  // }
  if (typeof func !== 'string') return false;
  var pattern = /^{{(.+)}}$/;
  var reg1 = /^{{function\(.+}}$/; // const reg2 = /^{{(.+=>.+)}}$/;

  if (typeof func === 'string' && func.match(pattern) && !func.match(reg1)) {
    return true;
  }

  return false;
}

var parseRootValueInSchema = function parseRootValueInSchema(schema, rootValue) {
  var result = clone(schema);

  if (isObject(schema)) {
    Object.keys(schema).forEach(function (key) {
      var item = schema[key];

      if (isObject(item)) {
        result[key] = parseRootValueInSchema(item, rootValue);
      } else if (typeof item === 'string') {
        result[key] = parseSingleRootValue(item, rootValue);
      }
    });
  } else {
    console.error('schema is not an object:', schema);
  }

  return result;
}; // handle rootValue inside List


exports.parseRootValueInSchema = parseRootValueInSchema;

var parseSingleRootValue = function parseSingleRootValue(expression) {
  var rootValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof expression === 'string' && expression.indexOf('rootValue') > 0) {
    var funcBody = expression.substring(2, expression.length - 2);
    var str = "\n    return ".concat(funcBody.replace(/rootValue/g, JSON.stringify(rootValue)));

    try {
      return Function(str)();
    } catch (error) {
      console.error(error, 'expression:', expression, 'rootValue:', rootValue);
      return null; // 如果计算有错误，return null 最合适
    }
  } else {
    return expression;
  }
};

exports.parseSingleRootValue = parseSingleRootValue;

function parseSingleExpression(func) {
  var formData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var dataPath = arguments.length > 2 ? arguments[2] : undefined;
  var parentPath = getParentPath(dataPath);
  var parent = getValueByPath(formData, parentPath) || {};

  if (typeof func === 'string') {
    var funcBody = func.substring(2, func.length - 2);
    var str = "\n    return ".concat(funcBody.replace(/formData/g, JSON.stringify(formData)).replace(/rootValue/g, JSON.stringify(parent)));

    try {
      return Function(str)();
    } catch (error) {
      console.log(error, func, dataPath);
      return null; // 如果计算有错误，return null 最合适
    } // const funcBody = func.substring(2, func.length - 2);
    // //TODO: 这样有问题，例如 a.b.indexOf(), 会把 a.b.indexOf 当做值
    // const match1 = /formData.([a-zA-Z0-9.$_\[\]]+)/g;
    // const match2 = /rootValue.([a-zA-Z0-9.$_\[\]]+)/g;
    // const str = `
    // return (${funcBody
    //   .replaceAll(match1, (v, m1) =>
    //     JSON.stringify(getValueByPath(formData, m1))
    //   )
    //   .replaceAll(match2, (v, m1) =>
    //     JSON.stringify(getValueByPath(parent, m1))
    //   )})`;
    // try {
    //   return Function(str)();
    // } catch (error) {
    //   console.log(error);
    //   return func;
    // }

  } else return func;
}

var schemaContainsExpression = function schemaContainsExpression(schema) {
  if (isObject(schema)) {
    return Object.keys(schema).some(function (key) {
      var value = schema[key];

      if (typeof value === 'string') {
        return isExpression(value);
      } else if (isObject(value)) {
        return schemaContainsExpression(value);
      } else {
        return false;
      }
    });
  }

  return false;
};

exports.schemaContainsExpression = schemaContainsExpression;

var parseAllExpression = function parseAllExpression(_schema, formData, dataPath) {
  var schema = clone(_schema);
  Object.keys(schema).forEach(function (key) {
    var value = schema[key];

    if (isObject(value)) {
      schema[key] = parseAllExpression(value, formData, dataPath);
    } else if (isExpression(value)) {
      schema[key] = parseSingleExpression(value, formData, dataPath);
    } else if (typeof key === 'string' && key.toLowerCase().indexOf('props') > -1) {
      // 有可能叫 xxxProps
      var propsObj = schema[key];

      if (isObject(propsObj)) {
        Object.keys(propsObj).forEach(function (k) {
          schema[key][k] = parseSingleExpression(propsObj[k], formData, dataPath);
        });
      }
    }
  });
  return schema;
};

exports.parseAllExpression = parseAllExpression;

function isFunctionSchema(schema) {
  return Object.keys(schema).some(function (key) {
    if (typeof schema[key] === 'function') {
      return true;
    } else if (typeof schema[key] === 'string') {
      return isExpression(schema[key]);
    } else if (_typeof(schema[key]) === 'object') {
      return isFunctionSchema(schema[key]);
    } else {
      return false;
    }
  });
}

var getParentProps = function getParentProps(propName, id, flatten) {
  try {
    var item = flatten[id];
    if (item.schema[propName] !== undefined) return item.schema[propName];

    if (item && item.parent) {
      var parentSchema = flatten[item.parent].schema;

      if (parentSchema[propName] !== undefined) {
        return parentSchema[propName];
      } else {
        return getParentProps(propName, item.parent, flatten);
      }
    }
  } catch (error) {
    return undefined;
  }
};

exports.getParentProps = getParentProps;

var getSaveNumber = function getSaveNumber() {
  var searchStr = localStorage.getItem('SAVES');

  if (searchStr) {
    try {
      var saves = JSON.parse(searchStr);
      var length = saves.length;
      if (length) return length + 1;
    } catch (error) {
      return 1;
    }
  } else {
    return 1;
  }
};

exports.getSaveNumber = getSaveNumber;

function looseJsonParse(obj) {
  return Function('"use strict";return (' + obj + ')')();
}

var isFunctionString = function isFunctionString(fString) {
  return typeof fString === 'string' && fString.indexOf('function(') === 0;
};

exports.isFunctionString = isFunctionString;

function parseFunction(fString) {
  if (isFunctionString(fString)) {
    return Function('return ' + fString)();
  }

  return fString;
} // 获得propsSchema的children
// function getChildren2(schema) {
//   if (!schema) return [];
//   const {
//     // object
//     properties,
//     // array
//     items,
//     type,
//   } = schema;
//   if (!properties && !items) {
//     return [];
//   }
//   let schemaSubs = {};
//   if (type === 'object') {
//     schemaSubs = properties;
//   }
//   if (type === 'array') {
//     schemaSubs = items.properties;
//   }
//   return Object.keys(schemaSubs).map(name => ({
//     schema: schemaSubs[name],
//     name,
//   }));
// }


var oldSchemaToNew = function oldSchemaToNew(schema) {
  if (schema && schema.propsSchema) {
    var propsSchema = schema.propsSchema,
        rest = _objectWithoutProperties(schema, _excluded);

    return _objectSpread({
      schema: propsSchema
    }, rest);
  }

  return schema;
};

exports.oldSchemaToNew = oldSchemaToNew;

var newSchemaToOld = function newSchemaToOld(setting) {
  if (setting && setting.schema) {
    var schema = setting.schema,
        rest = _objectWithoutProperties(setting, _excluded2);

    return _objectSpread({
      propsSchema: schema
    }, rest);
  }

  return setting;
}; // from FR


exports.newSchemaToOld = newSchemaToOld;

var getEnum = function getEnum(schema) {
  if (!schema) return undefined;
  var itemEnum = schema && schema.items && schema.items.enum;
  var schemaEnum = schema && schema.enum;
  return itemEnum ? itemEnum : schemaEnum;
}; // export const getArray = (arr, defaultValue = []) => {
//   if (Array.isArray(arr)) return arr;
//   return defaultValue;
// };


exports.getEnum = getEnum;

var isEmail = function isEmail(value) {
  var regex = '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$';

  if (value && new RegExp(regex).test(value)) {
    return true;
  }

  return false;
};

exports.isEmail = isEmail;

function defaultGetValueFromEvent(valuePropName) {
  var event = arguments.length <= 1 ? undefined : arguments[1];

  if (event && event.target && valuePropName in event.target) {
    return event.target[valuePropName];
  }

  return event;
}

var getKeyFromPath = function getKeyFromPath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#';

  try {
    var arr = path.split('.');
    var last = arr.slice(-1)[0];
    var result = last.replace('[]', '');
    return result;
  } catch (error) {
    console.error(error, 'getKeyFromPath');
    return '';
  }
}; // 更多的值获取


exports.getKeyFromPath = getKeyFromPath;

var getDisplayValue = function getDisplayValue(value, schema) {
  if (typeof value === 'boolean') {
    return value ? 'yes' : 'no';
  }

  if (isObjType(schema) || isListType(schema)) {
    return '-';
  }

  if (Array.isArray(schema.enum) && Array.isArray(schema.enumNames)) {
    try {
      return schema.enumNames[schema.enum.indexOf(value)];
    } catch (error) {
      return value;
    }
  }

  if (_typeof(value) === 'object') {
    return JSON.stringify(value);
  }

  return value;
}; // 去掉数组里的空元素 {a: [null, {x:1}]} => {a: [{x:1}]}


exports.getDisplayValue = getDisplayValue;

var removeEmptyItemFromList = function removeEmptyItemFromList(formData) {
  var result = {};

  if (isObject(formData)) {
    Object.keys(formData).forEach(function (key) {
      result[key] = removeEmptyItemFromList(formData[key]);
    });
  } else if (Array.isArray(formData)) {
    result = formData.filter(function (item) {
      if ([false, 0, ''].indexOf(item) > -1) return true;

      if (item && JSON.stringify(item) !== '{}') {
        return true;
      }

      return false;
    });
  } else {
    result = formData;
  }

  return result;
};

exports.removeEmptyItemFromList = removeEmptyItemFromList;

var getDescriptorSimple = function getDescriptorSimple() {
  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments.length > 1 ? arguments[1] : undefined;
  var result = {};

  if (isObject(schema)) {
    if (schema.type) {
      switch (schema.type) {
        case 'range':
          result.type = 'array';
          break;

        case 'html':
          result.type = 'string';
          break;

        default:
          result.type = schema.type;
          break;
      }
    }

    ['pattern', 'min', 'max', 'len', 'required'].forEach(function (key) {
      if (Object.keys(schema).indexOf(key) > -1) {
        result[key] = schema[key];
      }
    });

    switch (schema.format) {
      case 'email':
      case 'url':
        result.type = schema.format;
        break;

      default:
        break;
    }

    var handleRegx = function handleRegx(desc) {
      if (desc.pattern && typeof desc.pattern === 'string') {
        desc.pattern = new RegExp(desc.pattern);
      }

      return desc;
    }; // result be array


    if (schema.rules) {
      if (Array.isArray(schema.rules)) {
        var requiredRule = schema.rules.find(function (rule) {
          return rule.required === true;
        });

        if (requiredRule) {
          result = _objectSpread(_objectSpread({}, result), requiredRule);
        }

        result = [result].concat(_toConsumableArray(schema.rules));
        result = result.map(function (r) {
          return handleRegx(r);
        });
      } else if (isObject(schema.rules)) {
        result = [result, schema.rules];
        result = result.map(function (r) {
          return handleRegx(r);
        });
      }
    } else {
      result = [result];
    }
  }

  return _defineProperty({}, path, result);
}; // _path 只供内部递归使用


exports.getDescriptorSimple = getDescriptorSimple;

var generateDataSkeleton = function generateDataSkeleton(schema, formData) {
  var _formData = clone(formData);

  var result = _formData;

  if (isObjType(schema)) {
    if (_formData === undefined || _typeof(_formData) !== 'object') {
      _formData = {};
      result = {};
    }

    Object.keys(schema.properties).forEach(function (key) {
      var childSchema = schema.properties[key];
      var childData = _formData[key];
      var childResult = generateDataSkeleton(childSchema, childData);
      result[key] = childResult;
    });
  } else if (_formData !== undefined) {// result = _formData;
  } else if (schema.default !== undefined) {
    result = clone(schema.default);
  } else if (isListType(schema)) {
    result = [generateDataSkeleton(schema.items)];
  } else if (schema.type === 'boolean' && !schema.widget) {
    // result = false;
    result = undefined;
  } else {
    result = undefined;
  }

  return result;
};

exports.generateDataSkeleton = generateDataSkeleton;

var translateMessage = function translateMessage(msg, schema) {
  if (typeof msg !== 'string') {
    return '';
  }

  if (!schema) return msg;
  msg = msg.replace('${title}', schema.title);
  msg = msg.replace('${type}', schema.format || schema.type); // 兼容代码

  if (typeof schema.min === 'number') {
    msg = msg.replace('${min}', schema.min);
  }

  if (typeof schema.max === 'number') {
    msg = msg.replace('${max}', schema.max);
  }

  if (schema.rules) {
    var minRule = schema.rules.find(function (r) {
      return r.min !== undefined;
    });

    if (minRule) {
      msg = msg.replace('${min}', minRule.min);
    }

    var maxRule = schema.rules.find(function (r) {
      return r.max !== undefined;
    });

    if (maxRule) {
      msg = msg.replace('${max}', maxRule.max);
    }

    var lenRule = schema.rules.find(function (r) {
      return r.len !== undefined;
    });

    if (lenRule) {
      msg = msg.replace('${len}', lenRule.len);
    }

    var patternRule = schema.rules.find(function (r) {
      return r.pattern !== undefined;
    });

    if (patternRule) {
      msg = msg.replace('${pattern}', patternRule.pattern);
    }
  }

  return msg;
};

exports.translateMessage = translateMessage;

var changeSchema = function changeSchema(_schema, singleChange) {
  var schema = clone(_schema);
  schema = singleChange(schema);

  if (isObjType(schema)) {
    var requiredKeys = [];

    if (Array.isArray(schema.required)) {
      requiredKeys = schema.required;
      delete schema.required;
    }

    Object.keys(schema.properties).forEach(function (key) {
      var item = schema.properties[key];

      if (requiredKeys.indexOf(key) > -1) {
        item.required = true;
      }

      schema.properties[key] = changeSchema(item, singleChange);
    });
  } else if (isListType(schema)) {
    Object.keys(schema.items.properties).forEach(function (key) {
      var item = schema.items.properties[key];
      schema.items.properties[key] = changeSchema(item, singleChange);
    });
  }

  return schema;
};

var updateSchemaToNewVersion = function updateSchemaToNewVersion(schema) {
  return changeSchema(schema, updateSingleSchema);
};

exports.updateSchemaToNewVersion = updateSchemaToNewVersion;

var updateSingleSchema = function updateSingleSchema(schema) {
  try {
    schema.rules = schema.rules || [];
    schema.props = schema.props || {};

    if (schema['ui:options']) {
      schema.props = schema['ui:options'];
      delete schema['ui:options'];
    }

    if (schema.pattern) {
      var validItem = {
        pattern: schema.pattern
      };

      if (schema.message && schema.message.pattern) {
        validItem.message = schema.message.pattern;
      }

      schema.rules.push(validItem);
      delete schema.pattern;
      delete schema.message;
    } // min / max


    if (schema.minLength) {
      schema.min = schema.minLength;
      delete schema.minLength;
    }

    if (schema.maxLength) {
      schema.max = schema.maxLength;
      delete schema.maxLength;
    }

    if (schema.minItems) {
      schema.min = schema.minItems;
      delete schema.minItems;
    }

    if (schema.maxItems) {
      schema.max = schema.maxItems;
      delete schema.maxItems;
    }

    if (schema.step) {
      schema.props.step = schema.step;
      delete schema.step;
    } // ui:xxx


    if (schema['ui:className']) {
      schema.className = schema['ui:className'];
      delete schema['ui:className'];
    }

    if (schema['ui:hidden']) {
      schema.hidden = schema['ui:hidden'];
      delete schema['ui:hidden'];
    }

    if (schema['ui:readonly']) {
      schema.readOnly = schema['ui:readonly']; // 改成驼峰了

      delete schema['ui:readonly'];
    }

    if (schema['ui:disabled']) {
      schema.disabled = schema['ui:disabled'];
      delete schema['ui:disabled'];
    }

    if (schema['ui:width']) {
      schema.width = schema['ui:width'];
      delete schema['ui:width'];
    }

    if (schema['ui:displayType']) {
      schema.displayType = schema['ui:displayType'];
      delete schema['ui:displayType'];
    }

    if (schema['ui:column']) {
      schema.column = schema['ui:column'];
      delete schema['ui:column'];
    }

    if (schema['ui:widget']) {
      schema.widget = schema['ui:widget'];
      delete schema['ui:widget'];
    }

    if (schema['ui:labelWidth']) {
      schema.labelWidth = schema['ui:labelWidth'];
      delete schema['ui:labelWidth'];
    }

    if (schema.rules && schema.rules.length === 0) {
      delete schema.rules;
    }

    if (typeof schema.props === 'function' || isObject(schema.props) && Object.keys(schema.props).length > 0) {} else {
      delete schema.props;
    }

    return schema;
  } catch (error) {
    console.error('schema转换失败！', error);
    return schema;
  }
}; // 检验一个string是 function（传统活箭头函数）


var parseFunctionString = function parseFunctionString(string) {
  if (typeof string !== 'string') return false;
  var reg1 = /^{{(function.+)}}$/;
  var reg2 = /^{{(.+=>.+)}}$/;

  if (string.match(reg1)) {
    return string.match(reg1)[1];
  }

  if (string.match(reg2)) {
    return string.match(reg2)[1];
  }

  return false;
};

exports.parseFunctionString = parseFunctionString;

var completeSchemaWithTheme = function completeSchemaWithTheme() {
  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var theme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var result = {};

  if (isObject(schema)) {
    if (schema.theme && theme[schema.theme]) {
      result = _objectSpread(_objectSpread({}, schema), theme[schema.theme]);
    }

    Object.keys(schema).forEach(function (key) {
      result[key] = completeSchemaWithTheme(schema[key], theme);
    });
  } else {
    result = schema;
  }

  return result;
};

exports.completeSchemaWithTheme = completeSchemaWithTheme;

var cleanEmpty = function cleanEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj.map(function (v) {
      return v && isObject(v) ? cleanEmpty(v) : v;
    }).filter(function (v) {
      return !(v == undefined);
    });
  } else if (isObject(obj)) {
    return Object.entries(obj).map(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          k = _ref7[0],
          v = _ref7[1];

      return [k, v && isObject(v) ? cleanEmpty(v) : v];
    }).reduce(function (a, _ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          k = _ref9[0],
          v = _ref9[1];

      return v == undefined ? a : (a[k] = v, a);
    }, {});
  } else {
    return obj;
  }
}; // const x = { a: 1, b: { c: 2 }, d: [{ e: 3, f: [{ g: 5 }] }, { e: 4 }] };
// ['a', 'b.c', 'd[0].e', 'd[0].f[0].g', 'd[1].e']


exports.cleanEmpty = cleanEmpty;

var dataToKeys = function dataToKeys(data) {
  var rootKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var result = [];

  if (rootKey && rootKey.slice(-1) !== ']') {
    result.push(rootKey);
  }

  var isComplex = function isComplex(data) {
    return isObject(data) || Array.isArray(data);
  };

  if (isObject(data)) {
    Object.keys(data).forEach(function (key) {
      var item = data[key];
      var itemRootKey = rootKey ? rootKey + '.' + key : key;

      if (isComplex(item)) {
        var itemKeys = dataToKeys(item, itemRootKey);
        result = [].concat(_toConsumableArray(result), _toConsumableArray(itemKeys));
      } else {
        result.push(itemRootKey);
      }
    });
  } else if (Array.isArray(data)) {
    data.forEach(function (item, idx) {
      var itemRootKey = rootKey ? "".concat(rootKey, "[").concat(idx, "]") : "[".concat(idx, "]");

      if (isComplex(item)) {
        var itemKeys = dataToKeys(item, itemRootKey);
        result = [].concat(_toConsumableArray(result), _toConsumableArray(itemKeys));
      } else {
        result.push(itemRootKey);
      }
    });
  } else {}

  return result;
};

exports.dataToKeys = dataToKeys;

var removeHiddenFromResult = function removeHiddenFromResult(data, flatten) {
  var result = clone(data);
  var keys = dataToKeys(result);
  keys.forEach(function (key) {
    var _destructDataPath = destructDataPath(key),
        id = _destructDataPath.id,
        dataIndex = _destructDataPath.dataIndex;

    if (flatten[id]) {
      var _ref10 = flatten[id].schema || {},
          hidden = _ref10.hidden;

      if (isExpression(hidden)) {
        hidden = parseSingleExpression(hidden, result, key);
      }

      if ((0, _lodashEs.get)(result, key) !== undefined && hidden) {
        (0, _lodashEs.set)(result, key, undefined);
      }
    }
  });
  return result;
};

exports.removeHiddenFromResult = removeHiddenFromResult;

function msToTime(duration) {
  var seconds = Math.floor(duration / 1000 % 60);
  var minutes = Math.floor(duration / (1000 * 60) % 60);
  var hours = Math.floor(duration / (1000 * 60 * 60) % 24);
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return hours + ':' + minutes + ':' + seconds;
}

function yymmdd(timeStamp) {
  var date_ob = new Date(Number(timeStamp));

  var adjustZero = function adjustZero(num) {
    return ('0' + num).slice(-2);
  };

  var day = adjustZero(date_ob.getDate());
  var month = adjustZero(date_ob.getMonth());
  var year = date_ob.getFullYear();
  var hours = adjustZero(date_ob.getHours());
  var minutes = adjustZero(date_ob.getMinutes());
  var seconds = adjustZero(date_ob.getSeconds());
  return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}

function allPromiseFinish(promiseList) {
  var hasError = false;
  var count = promiseList.length;
  var results = [];

  if (!promiseList.length) {
    return Promise.resolve([]);
  }

  return new Promise(function (resolve, reject) {
    promiseList.forEach(function (promise, index) {
      promise.catch(function (e) {
        hasError = true;
        return e;
      }).then(function (result) {
        count -= 1;
        results[index] = result;

        if (count > 0) {
          return;
        }

        if (hasError) {
          reject(results);
        }

        resolve(results);
      });
    });
  });
}

var removeDups = function removeDups(arr) {
  if (!Array.isArray(arr)) {
    console.log('in removeDups: param is not an array');
    return;
  }

  var array = [];

  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i]);
    }
  }

  return array;
};

exports.removeDups = removeDups;