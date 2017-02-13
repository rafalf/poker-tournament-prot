describe('tearDown', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var club = require('../pages/club.po.js');

    var testData = require("../confs/test.json");

    beforeEach(function(){

        console.log('\n-->  test spec: ' + __filename)
        browser.get(testData.login_url)
    });

    afterEach(function () {
        console.log('\n--->');
    });

    // it('should delete all tournaments', function() {
    //
    //     login.getConnectEmailButton().click();
    //
    //     login.getLoginEmailInput().sendKeys(testData.gmail_user);
    //
    //     login.getLoginPasswordInput().sendKeys(testData.password);
    //
    //     login.getLoginButton().click();
    //
    //     page.waitForWelcomeHeading();
    //
    //     lobby.closeCreateClubModalIfPresent();
    //
    //     lobby.deleteAllTournaments();
    //
    //     lobby.getGetLogoutButton().click();
    //
    //     page.waitForLaunchWindow();
    //
    // });

    it('should delete all clubs - user 1', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        lobby.closeCreateClubModalIfPresent();

        club.deleteAllClubs();

    });

    it('should delete all clubs - user 2', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user2);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        lobby.closeCreateClubModalIfPresent();

        club.deleteAllClubs();

    });

});
