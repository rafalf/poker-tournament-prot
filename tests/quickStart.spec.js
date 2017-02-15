describe('tearDown', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var club = require('../pages/club.po.js');

    var testData = require("../confs/test.json");

    beforeAll(function(){

        console.log('\n-->  test spec: ' + __filename);
        browser.get(testData.login_url)
    });

    afterAll(function () {
        console.log('\n--->');
        browser.restart()
    });

    it('should delete all clubs', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading("test.blindvalet");
        expect(title).toBe('Welcome test.blindvalet');

        club.deleteAllClubs();

        page.waitUntilElementVisable(lobby.getQuickStartButton());
        expect(lobby.getQuickStartButton().isPresent()).toBeTruthy();

    });
});
