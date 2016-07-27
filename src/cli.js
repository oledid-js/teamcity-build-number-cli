#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const api = require("./api");

let jsonPath = process.cwd();
const args = process.argv.slice(2);

if (args.length > 0) {
	jsonPath = args.join(" ");
}

if (jsonPath.endsWith("package.json") === false) {
	jsonPath = path.join(jsonPath, "package.json");
}

fs.readFile(jsonPath, "utf8", (err, data) => {
	if (err) {
		console.log(`Could not find valid package.json: ${jsonPath}`);
		process.exit(1);
	}

	const obj = JSON.parse(data);
	if (!obj || !obj.version || obj.version.length === 0) {
		console.log(`Could not find version number in package.json: ${jsonPath}`);
		process.exit(1);
	}

	console.log(api.convertVersionToServiceMessage(obj.version));
});
