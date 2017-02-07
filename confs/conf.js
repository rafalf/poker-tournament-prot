var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome',
         chromeOptions: {
            args: ['--window-size=1600,1200'] // THIS!
        }
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

