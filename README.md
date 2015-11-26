[![Build Status](https://travis-ci.org/darlanmendonca/normalize-obj.svg)](https://travis-ci.org/thebergamo/parsick) 
[![Coverage Status](https://coveralls.io/repos/darlanmendonca/normalize-obj/badge.svg?branch=master&service=github)](https://coveralls.io/github/darlanmendonca/normalize-obj?branch=master)
[![npm version](https://badge.fury.io/js/normalize-obj.svg)](https://badge.fury.io/js/normalize-obj)

# normalize-obj

Rename keys, and/or change structure of an object.

# How use

First install module with 
```js 
npm install normalize-obj
```

# Usage

```js
var normalizeObj = require('normalize-obj');

var object = {name: 'Darlan', age: 25, address: {num: '117'}};

var normalized = normalizeObj(object)
	.change('name', 'fullname');

// return {fullname: 'Darlan', age: 25, address: {num: '117'}};
```

Methods can be chained, example:

```js
normalizeObj(object)
	.change('name', 'fullname')
	.change('age', 'old');

// return {fullname: 'Darlan', old: 25, address: {num:  '117'}};
```

Accept nesting keys, with dot syntax, to change

```js
normalizeObj(object)
	.change('address.num', 'address.number');

// return {name: 'Darlan', age: 25, address: {number: '117'}};
```

or change structure too
```js
normalizeObj(object)
	.change('address.num', 'number');

// return {name: 'Darlan', age: 25, number: '117'};
```

#### Important
On change structure, like below, if old structure don't have others properties, there are deleted. I.e:

```js
var object = {
	address: {
		street: 'Paulista',
		country: 'br',
		num: '1107'
	},
	phone: {
		mobile: '0000-0000'
	}
};

normalizeObj(object)
	.change('address.num', 'number');

/* 
	return 
	{
		number: 1107,
		// keep address, because have others properties
		address: {
			street: 'Paulista',
			country: 'br'
		},
		phone: {
			mobile: '0000-0000'
		}
	};

*/

// now, if dont have properties
normalizeObj(object)
	.change('phone.mobile', 'mobile');

/* 
	return 
	{
		number: 1107,
		address: {
			street: 'Paulista',
			country: 'br'
		},
		mobile: '0000-0000'
		// delete phone, because don't have others properties
	};

*/

```


# Tests

```js
npm test
```
