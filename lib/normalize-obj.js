'use strict';

module.exports = function(obj) {
	return new NormalizeKeys(obj);
};

function NormalizeKeys(obj) {
	var clone = JSON.parse(JSON.stringify(obj));

	clone.change = function(oldname, newname) {
		if (!clone.hasOwnProperty(oldname)) {
			throw new Error('object does not have the key '+oldname);
		}

		clone[newname] = clone[oldname];
		delete clone[oldname];

		return clone;
	};

	return clone;
}
