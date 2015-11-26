# normalize-keys

Return clone of an object, with renamed keys.

# How use

First install module with ```js npm install normalize-keys```

# Usage

```js
var normalizeKeys = require('normalize-keys');

var object = {name: 'Darlan', age: 25, address: {num: '117'}};
var normalized = normalizeKeys(object)
	.rename('name', 'fullname');

// return {fullname: 'Darlan', age: 25, address: {num: '117'}};
```

Methods can be chained, example:

```js
normalizeKeys(object)
	.rename('name', 'fullname')
	.rename('age', 'old');

// return {fullname: 'Darlan', old: 25, address: {num:  '117'}};
```

<!-- Accept nesting keys, with dot syntax, to rename

```js
normalizeKeys(object)
	.rename('address.num', 'address.number');

// return {name: 'Darlan', age: 25, address: {number: '117'}};
```

or change structure too
```js
normalizeKeys(object)
	.rename('address.num', 'number');

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

normalizeKeys(object)
	.rename('address.num', 'number');

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
normalizeKeys(object)
	.rename('phone.mobile', 'mobile');

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
 -->
# Tests

```js
npm test
```
