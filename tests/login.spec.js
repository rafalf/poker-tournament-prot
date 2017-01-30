describe('Login', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var testData = require("../confs/test.json");

    var EC = protractor.ExpectedConditions;

    beforeEach(function(){

        console.log('\n**********  test spec: ' + __filename + '  **********')
        browser.get(testData.login_url)
    });

    afterEach(function () {
        console.log('\n**********')
    });

    it('should sign up', function() {

        login.getLoginEmailButton().click();

        browser.pause();
        browser.debugger();


    });

});
