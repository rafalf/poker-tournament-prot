// var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
// var specReporter = require('jasmine-spec-reporter');

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'jasmine',

    // Jasmine-node.
    jasmineNodeOpts: {
        // onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true
    },

    suites: {
        smoke: ['../tests/loginSocial.spec.js',
                '../tests/createDeleteCT.spec.js'
                ],
        regression: [
            '../tests/loginSocial.spec.js',
            '../tests/createDeleteCT.spec.js',
            '../tests/registerTourn.spec.js'
        ],
        teardown: ['../tests/tearDown.spec.js'],
        dev: ['../tests/registerTourn.spec.js']
    },

   // onPrepare: function() {
   //
   //     jasmine.getEnv().addReporter(new specReporter());
   //     jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
   //         savePath: './reports/',
   //         takeScreenshots: true,
   //         takeScreenshotsOnlyOnFailures: true,
   //         screenshotsFolder: 'fail_images'
   //         })
   //     );
   // }
};

