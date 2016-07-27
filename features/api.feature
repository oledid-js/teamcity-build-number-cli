Feature: Using the api
	As a developer
	I want to use an api to convert package.json version numbers to TeamCity build numbers
	In order to see the build number in TeamCity

Scenario: Translate semver string to TeamCity build number
	Given that I have a semver string 1.2.3
	When I translate it to a TeamCity build number
	Then I should get a string ##teamcity[buildNumber '1.2.3.{build.number}']
