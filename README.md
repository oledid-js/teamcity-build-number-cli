# teamcity-build-number-cli [![Build Status](https://travis-ci.org/oledid-js/teamcity-build-number-cli.svg?branch=master)](https://travis-ci.org/oledid-js/teamcity-build-number-cli) [![npm](https://img.shields.io/npm/dt/teamcity-build-number-cli.svg)](https://www.npmjs.com/package/teamcity-build-number-cli) [![npm](https://img.shields.io/npm/v/teamcity-build-number-cli.svg)](https://www.npmjs.com/package/teamcity-build-number-cli)

Outputs version from package.json in TeamCity service message format.

## Install

```
$ npm install -g teamcity-build-number-cli
```


## Usage

First, make sure your TeamCity "build configuration -> general settings -> Build number format" is set to `%build.counter%`. This will give your build the number of the auto-incrementing build counter-value when you start building.

When the cli eventually outputs `##teamcity[buildNumber '1.2.3.{build.number}']` (if your package.json has version 1.2.3), TeamCity will read that and replace `{build.number}` with the value of "Build number format", which is `%build.counter%`. It will then rename the build in progress.

The resulting name of the build will be `#major.minor.patch.buildIterator`, where major, minor, patch comes from package.json, and buildIterator comes from TeamCity.


To call the cli, use one of these in your build process:
```js
// if package.json is in current directory:
teamcity-build-number

// or

teamcity-build-number path/to/directory/containg/packagejson

// or

teamcity-build-number path/to/package.json
```


## License

[MIT](LICENSE)
