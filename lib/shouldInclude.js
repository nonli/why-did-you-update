'use strict';

exports.__esModule = true;
exports.shouldInclude = undefined;

var _lodash = require('lodash.some');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shouldInclude = exports.shouldInclude = function shouldInclude(displayName, _ref) {
  var include = _ref.include,
      exclude = _ref.exclude;

  return (0, _lodash2.default)(include, function (r) {
    return r.test(displayName);
  }) && !(0, _lodash2.default)(exclude, function (r) {
    return r.test(displayName);
  });
};