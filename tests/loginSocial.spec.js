describe('login with fb and gmail case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js')

    var testData = require("../confs/test.json");


    describe('login with fb', function () {

        beforeAll(function(){

            console.log('\n-->  test spec: ' + __filename)
            browser.get(testData.login_url)
        });

        afterAll(function () {

            browser.ignoreSynchronization = false;
            browser.restart()
            console.log('\n--->');
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

            var title = lobby.getWelcomeHeading('PoTe Kurosava');
            expect(title).toContain('PoTe Kurosava');
        });

        it('should see log out', function () {
            expect(lobby.getGetLogoutButton().isPresent()).toBeTruthy();
        });
    });

    describe('login with gmail', function () {

        beforeAll(function(){

            console.log('\n-->  test spec: ' + __filename)
            browser.get(testData.login_url)
        });

        afterAll(function () {

            browser.ignoreSynchronization = false;
            browser.restart()
            console.log('\n--->');
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

            var title = lobby.getWelcomeHeading('akiro kurosava');
            expect(title).toContain('akiro kurosava');
        });

        it('should see log out', function () {
            expect(lobby.getGetLogoutButton().isPresent()).toBeTruthy();
        });
    });
});
