"use strict";

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const expect = require("chai").expect;
const api = require("../src/api.js");

const packageJson = require(path.join(__dirname, "../package.json"));

module.exports = function () {
	this.setDefaultTimeout(1000 * 10);

	this.World = function () {
		this.output = "";
		this.cliArguments = [];
		this.cwd = path.join(__dirname, "../");
	};

	this.Given("that I call the cli with no arguments", function (callback) {
		this.cliArguments = [];
		callback();
	});

	this.When("a package.json is present in the current directory", function (callback) {
		fs.access(path.join(this.cwd, "package.json"), fs.F_OK, err => {
			if (err) {
				throw err;
			}
			callback();
		});
	});

	this.Then("the correct TeamCity service message should be written to stdout", function () {
		return callCli(this.cliArguments, this.cwd)
			.then(data => {
				const expected = api.convertVersionToServiceMessage(packageJson.version);
				expect(data.output).to.equal(expected);
				expect(data.code).to.equal(0);
			});
	});

	this.Given(/^that I call the cli with a path (.*) as the first argument$/, function (path, callback) {
		this.cliArguments = [path];
		callback();
	});

	this.When("a package.json is present in the path from the first argument", function (callback) {
		fs.access(path.join(this.cliArguments[0], "package.json"), fs.F_OK, err => {
			if (err) {
				throw err;
			}
			callback();
		});
	});

	this.When("a package.json is not present in the path from the first argument", function (callback) {
		fs.access(path.join(this.cliArguments[0], "package.json"), fs.F_OK, err => {
			// eslint-disable-next-line no-unused-expressions
			expect(err).to.exist;
			callback();
		});
	});

	this.Then("the process should exit with code 1", function () {
		return callCli(this.cliArguments)
			.then(data => {
				expect(data.code).to.not.equal(0);
			});
	});
};

function callCli(args, cwd) {
	return new Promise(resolve => {
		let output = "";
		const actualArgs = [path.join(__dirname, "../src/cli.js")].concat(args);
		const process = childProcess.spawn("node", actualArgs, {cwd});
		process.stdout.on("data", data => {
			output += data.toString();
		});
		process.stderr.on("data", data => {
			console.error(data);
		});
		process.on("close", code => {
			resolve({
				output: output.trim(),
				code
			});
		});
	});
}
