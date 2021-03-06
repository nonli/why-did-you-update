import _isEqual from 'lodash.isequal';
import _isFunction from 'lodash.isfunction';
import _keys from 'lodash.keys';
import _union from 'lodash.union';
import _filter from 'lodash.filter';
import _every from 'lodash.every';
import _pick from 'lodash.pick';
import { Iterable } from 'immutable';

export var DIFF_TYPES = {
  UNAVOIDABLE: 'unavoidable',
  SAME: 'same',
  EQUAL: 'equal',
  FUNCTIONS: 'functions'
};

export var classifyDiff = function classifyDiff(prev, next, name) {

  if (Iterable.isIterable(prev)) {
    prev = prev.toJS();
  }
  if (Iterable.isIterable(next)) {
    next = next.toJS();
  }

  if (prev === next) {
    return {
      type: DIFF_TYPES.SAME,
      name: name,
      prev: prev,
      next: next
    };
  }

  if (_isEqual(prev, next)) {
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
    var prevValue = Iterable.isIterable(prev[key]) ? prev[key].toJS() : prev[key];
    var nextValue = Iterable.isIterable(next[key]) ? next[key].toJS() : next[key];
    return prevValue !== nextValue && !_isEqual(prevValue, nextValue);
  };
  var isSameFunction = function isSameFunction(key) {
    var prevFn = prev[key];
    var nextFn = next[key];
    return _isFunction(prevFn) && _isFunction(nextFn) && prevFn.name === nextFn.name;
  };

  var keys = _union(_keys(prev), _keys(next));
  var changedKeys = _filter(Iterable.isIterable(keys) ? keys.toJS() : keys, isChanged);

  if (changedKeys.length && _every(changedKeys, isSameFunction)) {
    return {
      type: DIFF_TYPES.FUNCTIONS,
      name: name,
      prev: _pick(prev, changedKeys),
      next: _pick(next, changedKeys)
    };
  }

  return {
    type: DIFF_TYPES.UNAVOIDABLE,
    name: name,
    prev: prev,
    next: next
  };
};