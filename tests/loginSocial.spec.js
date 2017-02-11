describe('login with fb and gmail case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js')

    var testData = require("../confs/test.json");

    beforeEach(function(){

        console.log('\n**********  test spec: ' + __filename + '  **********')

        browser.get(testData.login_url)
    });

    afterEach(function () {

        browser.ignoreSynchronization = false;
        browser.restart()

        console.log('\n**********')
    });

    it('should login with fb', function() {

        login.getConnectFbButton().click();

        // non angular page
        // fb booklet
        browser.ignoreSynchronization = true;

        page.switchToNewWindow();

        page.waitForFbBooklet();

        page.getFbLoginInput().sendKeys(testData.gmail_user);

        page.getFbPasswordInput().sendKeys(testData.password);

        page.getFbLoginButton().click();

        page.switchToMainWindow();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading();

        expect(title).toBe('Welcome PoTe Kurosava');

        lobby.getGetLogoutButton().click();

        page.waitForLaunchWindow();

    });


    it('should login with gmail', function() {

        login.getConnectGoogleButton().click();

        // non angular page
        // fb booklet
        browser.ignoreSynchronization = true;

        page.switchToNewWindow();

        page.waitForGoogle();

        page.getGoogleEmailInput().sendKeys(testData.gmail_user);

        page.getGoogleNextButton().click();

        page.waitForPassInput();

        page.getGooglePasswordInput().sendKeys(testData.password);

        page.getGoogleSignInButton().click();

        page.switchToMainWindow();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading();

        expect(title).toBe('Welcome akiro kurosava');

        lobby.getGetLogoutButton().click();

        page.waitForLaunchWindow();

    });

});
