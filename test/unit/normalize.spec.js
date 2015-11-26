/* globals describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;

var normalizeKeys = require('../../lib/normalize-obj');

var object = {
	nome: 'Darlan Mendonça',
	endereco: {
		rua: 'av. paulista',
		estado: 'sp',
		cep: '01310-300'
	},
	telefone: {
		trabalho: '9999-9999',
		celular: '99999-9999'
	}
};

describe('root keys', function() {
	it('exception object does not have the key', function() {
		var normalized = function() {
			normalizeKeys(object)
				.change('lero', 'what');
		};

		expect(normalized).to.throw(/^object does not have the key .{1,}$/);
	});

	it('single rename', function() {
		var normalized = normalizeKeys(object)
			.change('nome', 'fullname');

		expect(normalized).to.have.property('fullname').to.be.equal(object.nome);
		expect(normalized).to.not.have.property('nome');
	});


	it('multiple renames', function() {
		var normalized = normalizeKeys(object)
			.change('nome', 'fullname')
			.change('endereco', 'address');

		expect(normalized).to.have.property('fullname').to.be.equal(object.nome);
		expect(normalized).to.not.have.property('nome');

		expect(normalized).to.have.property('address').to.deep.equal(object.endereco);
		expect(normalized).to.not.have.property('endereco');
	});
});
