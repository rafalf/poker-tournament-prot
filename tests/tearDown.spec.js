describe('tearDown', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var club = require('../pages/club.po.js');

    var testData = require("../confs/test.json");

    beforeEach(function(){

        console.log('\n-->  test spec: ' + __filename);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
        browser.get(testData.login_url)

    });

    afterEach(function () {
        console.log('\n--->');
        browser.restart()
    });

    it('should delete all clubs - user 1', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading("test.blindvalet");
        expect(title).toContain('test.blindvalet');

        club.deleteAllClubs();

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false);

        expect(lobby.getCreateTourButton().isDisplayed()).toBeFalsy();
    });


    it('should delete all clubs - user 2', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user2);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading("test.blind.valet");
        expect(title).toContain('test.blind.valet');

        club.deleteAllClubs();

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false);

        expect(lobby.getCreateTourButton().isDisplayed()).toBeFalsy();
    });
});
