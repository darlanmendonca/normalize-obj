/* globals describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;

var normalizeObj = require('../../lib/normalize-obj');

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

describe('NormalizeObj', function() {
	it('exception when object does not have the key', function() {
		var normalized = function() {
			normalizeObj(object)
				.change('lero', 'what');
		};

		expect(normalized).to.throw(/^object does not have the key .{1,}$/);
	});

	it('single rename', function() {
		var normalized = normalizeObj(object)
			.change('nome', 'fullname');

		expect(normalized).to.have.property('fullname').to.be.equal(object.nome);
		expect(normalized).to.not.have.property('nome');
	});

	it('nesting single rename', function() {
		var normalized = normalizeObj(object)
			.change('telefone.celular', 'telefone.mobile');

		expect(normalized)
			.to.have.property('telefone')
			.to.have.property('mobile')
			.to.be.equal(object.telefone.celular);

		expect(normalized)
			.to.have.property('telefone')
			.to.not.have.property('celular');
	});

	it('nesting single change structure', function() {
		var normalized = normalizeObj(object)
			.change('telefone.celular', 'mobile');

		expect(normalized)
			.to.have.property('mobile')
			.to.be.equal(object.telefone.celular);

		expect(normalized)
			.to.have.property('telefone')
			.to.not.have.property('celular');
	});

	it('multiple renames', function() {
		var normalized = normalizeObj(object)
			.change('nome', 'fullname')
			.change('endereco', 'address');

		expect(normalized)
			.to.have.property('fullname')
			.to.be.equal(object.nome);
		expect(normalized).to.not.have.property('nome');

		expect(normalized)
			.to.have.property('address')
			.to.deep.equal(object.endereco);
		expect(normalized).to.not.have.property('endereco');
	});

	it('nesting multiple renames', function() {
		var normalized = normalizeObj(object)
			.change('telefone', 'phones')
			.change('phones.trabalho', 'phones.work')
			.change('phones.celular', 'phones.mobile');

		expect(normalized)
			.to.have.property('phones')
			.to.have.property('work')
			.to.be.equal(object.telefone.trabalho);

		expect(normalized)
			.to.have.property('phones')
			.to.have.property('mobile')
			.to.be.equal(object.telefone.celular);

		expect(normalized.phones)
			.to.not.have.property('trabalho');

		expect(normalized.phones)
			.to.not.have.property('celular');
	});

	it('nesting multiple change structure, delete empty parent key', function() {
		var normalized = normalizeObj(object)
			.change('telefone.trabalho', 'work')
			.change('telefone.celular', 'mobile');

		expect(normalized)
			.to.have.property('work')
			.to.be.equal(object.telefone.trabalho);

		expect(normalized)
			.to.have.property('mobile')
			.to.be.equal(object.telefone.celular);

		expect(normalized)
			.to.not.have.property('telefone');
	});

	it('nesting multiple change structure, keep filled parent key', function() {
		var normalized = normalizeObj(object)
			.change('telefone.trabalho', 'work');

		expect(normalized)
			.to.have.property('work')
			.to.be.equal(object.telefone.trabalho);

		expect(normalized)
			.to.have.property('telefone');
	});
});
