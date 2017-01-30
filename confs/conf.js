var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../tests/login.spec.js'],

    // browser
    capabilities: {
        'browserName': 'chrome'
    },

    // Jasmine-node.
    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './reports/',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true,
            screenshotsFolder: 'fail_images'
            })
        );
    }
};

