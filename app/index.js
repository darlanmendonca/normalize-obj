'use strict';

module.exports = (obj) => new NormalizeKeys(obj);

function NormalizeKeys(obj) {
	let deep = require('deep-get-set');
	let unset = require('unset-value');

	let normalized = JSON.parse(JSON.stringify(obj));

	normalized.change = change;
  normalized.copy = copy;

  return normalized;

  function change(oldname, newname) {
    if (!deep(normalized, oldname) || (newname === oldname)) {
      return normalized;
    }

    deep(normalized, newname, deep(normalized, oldname));
    unset(normalized, oldname);

    let parentKey = oldname.split('.');
    parentKey = parentKey.slice(0, parentKey.length - 1);
    parentKey = parentKey.join('.');
    let parentKeyEmpty = parentKey &&
      Object.keys(deep(normalized, parentKey)).length === 0;

    if (parentKeyEmpty) {
      unset(normalized, parentKey);
    }

    return normalized;
  }

  function copy(oldname, newname) {
    deep(normalized, newname, deep(normalized, oldname));
    return normalized;
  }
}

