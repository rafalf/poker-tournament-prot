describe('Login', function() {

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
        console.log('\n**********')
    });

    it('should login with fb and create a club', function() {

        login.getConnectFbButton().click();

        // non angular page
        // fb booklet
        browser.ignoreSynchronization = true;

        page.switchToNewWindow();

        page.waitForFbBooklet();

        page.getFbLoginInput().sendKeys(testData.gmail_user);

        page.getFbPasswordInput().sendKeys(testData.password);

        page.getFbLoginButton().click();

        // back on poker angular page
        browser.ignoreSynchronization = true;

        page.switchToMainWindow();

        // create club modal

        lobby.waitForLobby();

        var clubName = page.getRandomString();
        lobby.getCreateClubInput().sendKeys(clubName);

        browser.pause();
        browser.debugger();

    });


    xit('should sign up', function() {

        login.getLoginEmailButton().click();

        login.getSignUpEmailInput().sendKeys(page.getRandomString() + "@test.com");

        login.getSignUpPasswordInput().sendKeys(testData.password);

    });

});
