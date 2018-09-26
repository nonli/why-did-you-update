'use strict';

exports.__esModule = true;
exports.classifyDiff = exports.DIFF_TYPES = undefined;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isfunction');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.keys');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.union');

var _lodash8 = _interopRequireDefault(_lodash7);

var _lodash9 = require('lodash.filter');

var _lodash10 = _interopRequireDefault(_lodash9);

var _lodash11 = require('lodash.every');

var _lodash12 = _interopRequireDefault(_lodash11);

var _lodash13 = require('lodash.pick');

var _lodash14 = _interopRequireDefault(_lodash13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DIFF_TYPES = exports.DIFF_TYPES = {
  UNAVOIDABLE: 'unavoidable',
  SAME: 'same',
  EQUAL: 'equal',
  FUNCTIONS: 'functions'
};

var classifyDiff = exports.classifyDiff = function classifyDiff(prev, next, name) {
  if (prev === next) {
    return {
      type: DIFF_TYPES.SAME,
      name: name,
      prev: prev,
      next: next
    };
  }

  if ((0, _lodash2.default)(prev, next)) {
    return {
      type: DIFF_TYPES.EQUAL,
      name: name,
      prev: prev,
      next: next
    };
  }

  if (!prev || !next) {
    return {
      type: DIFF_TYPES.UNAVOIDABLE,
      name: name,
      prev: prev,
      next: next
    };
  }

  var isChanged = function isChanged(key) {
    return prev[key] !== next[key] && !(0, _lodash2.default)(prev[key], next[key]);
  };
  var isSameFunction = function isSameFunction(key) {
    var prevFn = prev[key];
    var nextFn = next[key];
    return (0, _lodash4.default)(prevFn) && (0, _lodash4.default)(nextFn) && prevFn.name === nextFn.name;
  };

  var keys = (0, _lodash8.default)((0, _lodash6.default)(prev), (0, _lodash6.default)(next));
  var changedKeys = (0, _lodash10.default)(keys, isChanged);

  if (changedKeys.length && (0, _lodash12.default)(changedKeys, isSameFunction)) {
    return {
      type: DIFF_TYPES.FUNCTIONS,
      name: name,
      prev: (0, _lodash14.default)(prev, changedKeys),
      next: (0, _lodash14.default)(next, changedKeys)
    };
  }

  return {
    type: DIFF_TYPES.UNAVOIDABLE,
    name: name,
    prev: prev,
    next: next
  };
};