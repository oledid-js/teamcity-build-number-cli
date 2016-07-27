npm install

# change build number
node .\src\cli.js

# run xo
write-host "##teamcity[testSuiteStarted name='xo']"
.\node_modules\.bin\xo --reporter tap | .\node_modules\.bin\tap-teamcity.cmd
write-host "##teamcity[testSuiteFinished name='xo']"

# run tests
.\node_modules\.bin\cucumber-js.cmd --format json | .\node_modules\.bin\cucumber-json-to-teamcity.cmd
