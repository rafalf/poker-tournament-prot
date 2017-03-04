var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome',
         chromeOptions: {
            args: ['--window-size=1600,1200']
        }
    },

    directConnect: true,
    framework: 'jasmine',

    // Jasmine-node.
    jasmineNodeOpts: {
        // onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 90000
    },

    suites: {
        smoke: ['../tests/loginSocial.spec.js',
                '../tests/createDeleteCT.spec.js',
                '../tests/signup.spec.js',
                '../tests/quickStart.spec.js'
                ],
        regression: [
            '../tests/loginSocial.spec.js',
            '../tests/createDeleteCT.spec.js',
            '../tests/quickStart.spec.js',
            '../tests/joinClub.spec.js',
            '../tests/registerTourn.spec.js',
            '../tests/blindStructure.spec.js',
            '../tests/tournParameters.spec.js',
            '../tests/signup.spec.js',
            '../tests/knockout.spec.js',
            '../tests/payouts.spec.js',
            '../tests/seating.spec.js'
        ],
        teardown: ['../tests/tearDown.spec.js'],
        dev: ['../tests/createDeleteCT.spec.js']
    },

   onPrepare: function() {
       jasmine.getEnv().addReporter(new SpecReporter());
       jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
           savePath: './reports/',
           takeScreenshots: true,
           takeScreenshotsOnlyOnFailures: true,
           screenshotsFolder: 'fail_images'
           })
       );
   }
};

