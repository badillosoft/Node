var assert = require('assert');

function foo(id, callback) {
	callback('pepe', 'fulano');
}

foo(23, function (n, a) {
	assert(n, 'pepe');
	assert(a, 'fulano');
});