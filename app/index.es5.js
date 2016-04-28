'use strict';

module.exports = function (obj) {
  return new NormalizeKeys(obj);
};

function NormalizeKeys(obj) {
  var deep = require('deep-get-set');
  var unset = require('unset-value');

  var normalized = JSON.parse(JSON.stringify(obj));

  normalized.change = change;
  normalized.copy = copy;

  return normalized;

  function change(oldname, newname) {
    if (!deep(normalized, oldname) || newname === oldname) {
      return normalized;
    }

    deep(normalized, newname, deep(normalized, oldname));
    unset(normalized, oldname);

    var parentKey = oldname.split('.');
    parentKey = parentKey.slice(0, parentKey.length - 1);
    parentKey = parentKey.join('.');
    var parentKeyEmpty = parentKey && Object.keys(deep(normalized, parentKey)).length === 0;

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
