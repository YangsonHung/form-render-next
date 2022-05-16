"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateField = exports.validateAll = exports.parseSchemaExpression = void 0;

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _lodashEs = require("lodash-es");

var _utils = require("./utils");

var _validateMessage = require("./validateMessage");

var _validateMessageCN = require("./validateMessageCN");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var parseSchemaExpression = function parseSchemaExpression(schema, formData, path) {
  if (!(0, _utils.isObject)(schema)) return schema;
  var result = {};
  Object.keys(schema).forEach(function (key) {
    var item = schema[key];

    if ((0, _utils.isObject)(item)) {
      result[key] = parseSchemaExpression(item, formData, path);
    } else if ((0, _utils.isExpression)(item)) {
      result[key] = (0, _utils.parseSingleExpression)(item, formData, path);
    } else {
      result[key] = item;
    }
  });
  return result;
};

exports.parseSchemaExpression = parseSchemaExpression;

var getRelatedPaths = function getRelatedPaths(path, flatten) {
  var parentPaths = [];
  var pathArr = path.split('.');

  while (pathArr.length > 0) {
    parentPaths.push(pathArr.join('.'));
    pathArr.pop();
  }

  var result = [].concat(parentPaths);
  parentPaths.forEach(function (path) {
    var _destructDataPath = (0, _utils.destructDataPath)(path),
        id = _destructDataPath.id,
        dataIndex = _destructDataPath.dataIndex;

    if (flatten[id] && flatten[id].schema && Array.isArray(flatten[id].schema.dependecies)) {
      var deps = flatten[id].schema.dependecies;
      var fullPathDeps = deps.map(function (dep) {
        return (0, _utils.getDataPath)(dep, dataIndex);
      });
      result = [].concat(_toConsumableArray(result), _toConsumableArray(fullPathDeps));
    }
  });
  return (0, _utils.removeDups)(result).map(function (path) {
    if (path.slice(-1) === ']') {
      var pattern = /\[[0-9]+\]$/;
      return path.replace(pattern, '');
    } else {
      return path;
    }
  });
};

var validateField = function validateField(_ref) {
  var path = _ref.path,
      formData = _ref.formData,
      flatten = _ref.flatten,
      options = _ref.options;
  var paths = getRelatedPaths(path, flatten); // console.log('all relevant paths:', paths);

  var promiseArray = paths.map(function (path) {
    var _destructDataPath2 = (0, _utils.destructDataPath)(path),
        id = _destructDataPath2.id,
        dataIndex = _destructDataPath2.dataIndex;

    if (flatten[id] || flatten["".concat(id, "[]")]) {
      var item = flatten[id] || flatten["".concat(id, "[]")];
      var singleData = (0, _lodashEs.get)(formData, path);
      var schema = item.schema || {};
      var finalSchema = parseSchemaExpression(schema, formData, path);
      return validateSingle(singleData, finalSchema, path, options); // is a promise
    } else {
      return Promise.resolve();
    }
  });
  return (0, _utils.allPromiseFinish)(promiseArray).then(function (res) {
    var errorFields = res.filter(function (item) {
      return Array.isArray(item) && item.length > 0;
    }).map(function (item) {
      var name = item[0].field;
      var error = item.map(function (m) {
        return m.message;
      }).filter(function (m) {
        return !!m;
      });
      return {
        name: name,
        error: error
      };
    });
    return errorFields;
  }).catch(function (e) {
    console.log(e);
  });
}; // pathFromData => allPath


exports.validateField = validateField;

var getAllPaths = function getAllPaths(paths, flatten) {
  if (!Array.isArray(paths)) return [];

  var result = _toConsumableArray(paths).filter(function (p) {
    return p.indexOf(']') > -1;
  }).map(function (p1) {
    var last = p1.lastIndexOf(']');
    return p1.substring(0, last + 1);
  });

  var uniqueResult = (0, _utils.removeDups)(result);
  var allFlattenPath = Object.keys(flatten);

  var res = _toConsumableArray(paths);

  uniqueResult.forEach(function (result) {
    var _destructDataPath3 = (0, _utils.destructDataPath)(result),
        id = _destructDataPath3.id,
        dataIndex = _destructDataPath3.dataIndex;

    if (flatten[id]) {
      var children = allFlattenPath.filter(function (f) {
        return f.indexOf(id) === 0 && f !== id;
      });
      var childrenWithIndex = children.map(function (child) {
        var p = (0, _utils.getDataPath)(child, dataIndex);
        return p.split('[]')[0];
      }).filter(function (i) {
        return !!i;
      });
      res = [].concat(_toConsumableArray(res), _toConsumableArray((0, _utils.removeDups)(childrenWithIndex)));
    }
  });
  return (0, _utils.removeDups)(res);
};

var validateAll = function validateAll(_ref2) {
  var formData = _ref2.formData,
      flatten = _ref2.flatten,
      options = _ref2.options;
  var paths = (0, _utils.dataToKeys)(formData);
  var allPaths = getAllPaths(paths, flatten); // console.log(formData, dataToKeys(formData), 'dataToKeysdataToKeys');
  // console.log('allPaths', allPaths);

  var promiseArray = allPaths.map(function (path) {
    var _destructDataPath4 = (0, _utils.destructDataPath)(path),
        id = _destructDataPath4.id,
        dataIndex = _destructDataPath4.dataIndex;

    if (flatten[id] || flatten["".concat(id, "[]")]) {
      var item = flatten[id] || flatten["".concat(id, "[]")];
      var singleData = (0, _lodashEs.get)(formData, path);
      var schema = item.schema || {};
      var finalSchema = parseSchemaExpression(schema, formData, path);
      return validateSingle(singleData, finalSchema, path, options); // is a promise
    } else {
      return Promise.resolve();
    }
  });
  return (0, _utils.allPromiseFinish)(promiseArray).then(function (res) {
    var errorFields = res.filter(function (item) {
      return Array.isArray(item) && item.length > 0 && item[0].message !== null;
    }) // NOTICE: different from validateField
    .map(function (item) {
      var name = item[0].field;
      var error = item.map(function (m) {
        return m.message;
      }).filter(function (m) {
        return !!m;
      });
      return {
        name: name,
        error: error
      };
    });
    return errorFields;
  }).catch(function (e) {
    console.log(e);
  });
};

exports.validateAll = validateAll;

var validateSingle = function validateSingle(data) {
  var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var path = arguments.length > 2 ? arguments[2] : undefined;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (schema.hidden) {
    return Promise.resolve();
  }

  var _options$validateMess = options.validateMessages,
      validateMessages = _options$validateMess === void 0 ? {} : _options$validateMess,
      _options$locale = options.locale,
      locale = _options$locale === void 0 ? 'cn' : _options$locale;
  var cn = _validateMessageCN.defaultValidateMessagesCN;
  var en = _validateMessage.defaultValidateMessages;
  var descriptor = (0, _utils.getDescriptorSimple)(schema, path); // console.log('descriptor, schema, path', descriptor, schema, path, data);
  // TODO: 有些情况会出现没有rules，需要看一下，先兜底

  var validator;

  try {
    validator = new _asyncValidator.default(descriptor);
  } catch (error) {
    return Promise.resolve();
  }

  var messageFeed = locale === 'en' ? en : cn;
  (0, _lodashEs.merge)(messageFeed, validateMessages);
  validator.messages(messageFeed);
  return validator.validate(_defineProperty({}, path, data)).then(function (res) {
    return [{
      field: path,
      message: null
    }];
  }).catch(function (_ref3) {
    var errors = _ref3.errors,
        fields = _ref3.fields;
    return errors;
  });
};