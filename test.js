var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should;
var inputVal = require('./libs/input.js');

var win = require('./libs/Win.js');
var place = require('./libs/Place.js');
var Exacta = require('./libs/Exacta.js');

describe('validate', function () {
	it('should return the split string with no errors', function () {
		expect(function () {
			inputVal.validate('Bet:W:2:4', function (err, result) {
				should.exist(result);
				expect(result).to.equal('Bet:W:2:4');
				should.not.exist(err);
			});
		});
	});
	it('should return an error', function () {
		expect(function () {
			inputVal.validate('Bet:W:2:4:0', function (err, result) {
				should.exist(err);
			});
		});
	});
	it('should return an Int with no errors', function () {
		var input = inputVal.validateAndParseInt('2');
		expect(input).to.equal(2);
	});
	it('should throw an error', function () {
		expect(function () {
			inputVal.validateAndParseInt('t');
		}).to.throw(Error);
	});
});
describe('Win', function () {
	var arr = [{ selection: 1, stake: 3 }, { selection: 2, stake: 4 }, { selection: 3, stake: 5 }, { selection: 4, stake: 5 },
		{ selection: 1, stake: 16 }, { selection: 2, stake: 8 }, { selection: 3, stake: 22 }, { selection: 4, stake: 57 },
		{ selection: 1, stake: 42 }, { selection: 2, stake: 98 }, { selection: 3, stake: 63 }, { selection: 4, stake: 15 }]
	it('Should be the correct output', function () {
		win.getWinDividends(arr, 2, function (err, result) {
			expect(result).to.equal('2.61');
		});

	});
});

describe('Exacta', function () {
	var arr = [
		{ selectionOne: 1, selectionTwo: 2, stake: 13 },
		{ selectionOne: 2, selectionTwo: 3, stake: 98 },
		{ selectionOne: 1, selectionTwo: 3, stake: 82 },
		{ selectionOne: 3, selectionTwo: 2, stake: 27 },
		{ selectionOne: 1, selectionTwo: 2, stake: 5 },
		{ selectionOne: 2, selectionTwo: 3, stake: 61 },
		{ selectionOne: 1, selectionTwo: 3, stake: 28 },
		{ selectionOne: 3, selectionTwo: 2, stake: 25 },
		{ selectionOne: 1, selectionTwo: 2, stake: 81 },
		{ selectionOne: 2, selectionTwo: 3, stake: 47 },
		{ selectionOne: 1, selectionTwo: 3, stake: 93 },
		{ selectionOne: 3, selectionTwo: 2, stake: 51 }]
	it('Should be the correct output', function () {
		Exacta.getExactaDividend(arr, 2, 3, function (err, result) {
			expect(result).to.equal('2.43');
		});
	});
});

describe('Place', function () {
	var arr = [{ selection: 1, stake: 31 }, { selection: 2, stake: 89 }, { selection: 3, stake: 28 }, { selection: 4, stake: 72 },
		{ selection: 1, stake: 40 }, { selection: 2, stake: 16 }, { selection: 3, stake: 82 }, { selection: 4, stake: 52 },
		{ selection: 1, stake: 18 }, { selection: 2, stake: 74 }, { selection: 3, stake: 39 }, { selection: 4, stake: 105 }]
	it('Should be the correct output', function () {
		place.getPlaceDivdend(arr, 2, function (err, result) {
			expect(result).to.equal('1.06');
		});
		place.getPlaceDivdend(arr, 3, function (err, result) {
			expect(result).to.equal('1.27');
		});
		place.getPlaceDivdend(arr, 1, function (err, result) {
			expect(result).to.equal('2.13');
		});
	});

});