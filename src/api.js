"use strict";

module.exports = {
	convertVersionToServiceMessage: version => {
		const parts = version.split(".");
		const majorVersion = parts[0];
		const minorVersion = parts[1];
		const patchVersion = parts[2];
		return `##teamcity[buildNumber '${majorVersion}.${minorVersion}.${patchVersion}.{build.number}']`;
	}
};
