'use strict';

module.exports = function(obj) {
	return new NormalizeKeys(obj);
};

function NormalizeKeys(obj) {
	let deep = require('deep-get-set');
	let unset = require('unset-value');
	obj = JSON.parse(JSON.stringify(obj));

	obj.change = function(oldname, newname) {
		if (!deep(obj, oldname) || (newname === oldname)) {
			return obj;
		}

		deep(obj, newname, deep(obj, oldname));
		unset(obj, oldname);

		let parentKey = oldname.split('.');
		parentKey = parentKey.slice(0, parentKey.length - 1);
		parentKey = parentKey.join('.');
		let parentKeyEmpty = parentKey &&
			Object.keys(deep(obj, parentKey)).length === 0;

		if (parentKeyEmpty) {
			unset(obj, parentKey);
		}

		return obj;
	};

  obj.copy = function(oldname, newname) {
    deep(obj, newname, deep(obj, oldname));
    return obj;
  };

	return obj;
}
