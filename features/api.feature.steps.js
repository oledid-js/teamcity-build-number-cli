"use strict";

const expect = require("chai").expect;
const api = require("../src/api");

module.exports = function () {
	this.World = function () {
		this.input = null;
		this.output = null;
	};

	this.Given(/^that I have a semver string (.*)$/, function (input, callback) {
		this.input = input;
		callback();
	});

	this.When("I translate it to a TeamCity build number", function (callback) {
		this.output = api.convertVersionToServiceMessage(this.input);
		callback();
	});

	this.Then(/^I should get a string (.*)$/, function (expected, callback) {
		expect(expected).to.equal(this.output);
		callback();
	});
};
