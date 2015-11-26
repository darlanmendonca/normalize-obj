'use strict';

module.exports = function(obj) {
	return new NormalizeKeys(obj);
};

function NormalizeKeys(obj) {
	var deep = require('deep-get-set');
	var unset = require('unset-value');
	var clone = JSON.parse(JSON.stringify(obj));

	clone.change = function(oldname, newname) {
		// !clone.hasOwnProperty(oldname)
		if (!deep(clone, oldname)) {
			throw new Error('object does not have the key '+oldname);
		}

		deep(clone, newname, deep(clone, oldname));
		unset(clone, oldname);

		var parentKey = oldname.split('.');
		parentKey = parentKey.slice(0, parentKey.length - 1);
		parentKey = parentKey.join('.');
		var parentKeyEmpty = parentKey &&
			Object.keys(deep(clone, parentKey)).length === 0;

		if (parentKeyEmpty) {
			unset(clone, parentKey);
		}

		return clone;
	};

	return clone;
}
