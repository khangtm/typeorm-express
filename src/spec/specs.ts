const Jasmine = require('jasmine');
const JasmineConsoleReporter = require('jasmine-console-reporter');
const jasmineConfig = new Jasmine();

var reporter = new JasmineConsoleReporter({
        colors: 1,
        cleanStack: 3,
        verbosity: 4,
        listStyle: 'indent',
        activity: false
});

jasmineConfig.addReporter(reporter);
jasmineConfig.showColors(true);
jasmineConfig.loadConfigFile('src/spec/jasmine.json');
jasmineConfig.execute();