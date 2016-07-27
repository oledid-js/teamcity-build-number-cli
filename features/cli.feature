Feature: Using the cli
	As a developer
	I want to use a cli to prepend my npm version to the buildnumber
	In order to see the build number as Major.Minor.Patch.Buildnumber in TeamCity

Scenario: Finding package.json in the current directory
	Given that I call the cli with no arguments
	When a package.json is present in the current directory
	Then the correct TeamCity service message should be written to stdout

Scenario: Finding package.json in the supplied path
	Given that I call the cli with a path . as the first argument
	When a package.json is present in the path from the first argument
	Then the correct TeamCity service message should be written to stdout

Scenario: Not finding package.json
	Given that I call the cli with a path features as the first argument
	When a package.json is not present in the path from the first argument
	Then the process should exit with code 1
