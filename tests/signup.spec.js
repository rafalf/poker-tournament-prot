describe('sign up case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var club = require('../pages/club.po.js');

    var testData = require("../confs/test.json");

    beforeAll(function(){

        console.log('\n-->  test spec: ' + __filename)
        browser.get(testData.login_url);

    });

    afterAll(function () {
        console.log('\n--->');
        browser.restart();
    });

    it('should sign up', function() {

        login.getConnectEmailButton().click();

        var user = page.getRandomAlphabeticString(10)
        login.getSignUpEmailInput().sendKeys(user + "@protractor.com");

        login.getSignUpPasswordInput().sendKeys('password');

        login.getSignUpButton().click();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading(user);
        expect(title).toBe("Welcome " + user);

        expect(lobby.getEmailVerifyHeading().isDisplayed()).toBe(true);

        lobby.getEmailResendButton().click();

    });

    it('should log out', function() {

        lobby.getGetLogoutButton().click();
        page.waitForLaunchWindow();
    });
});
