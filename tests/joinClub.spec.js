describe('add/delete club and tournament case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var club = require('../pages/club.po.js');
    var join = require('../pages/join.po.js');

    var testData = require("../confs/test.json");

    var club_name = "Club-" + page.getRandomNumber();

    beforeAll(function(){

        console.log('\n-->  test spec: ' + __filename)
        browser.get(testData.login_url);

    });

    afterAll(function () {
        console.log('\n--->');
        browser.restart();
    });

    it('should login as user and add a new club', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        club.deleteAllClubs();
        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false);

        lobby.getAddClubMenu().click();

        lobby.getEnterClubNameInput().sendKeys(club_name);

        lobby.getEnterClubPassword().sendKeys('pass');

        lobby.getCreateClubButton().click();

        page.waitForModalNotPresent();

        var heading = lobby.getClubHeading(club_name);
        expect(heading).toContain(club_name);
    });

    it('should grab club id, logout, login as user 2', function() {

        lobby.getInviteMembersButton().click();

        var clubIdPro = lobby.getClubId();

        lobby.getCloseInviteModalButton().click();

        lobby.getGetLogoutButton().click();
        page.waitForLaunchWindow();

        page.getLaunchButton().click();

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user2);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading('test.blind.valet');
        expect(title).toContain('test.blind.valet');

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false);

        lobby.getAddClubMenu().click();

        lobby.enterClubId(clubIdPro);
    });

    it('should enter password and join club', function() {
        

        page.waitUntilElementVisable(join.getEnterPassJoinInput());

        join.getEnterPassJoinInput().sendKeys('pass');

        page.getDismissAlertClickable().click();
        expect(page.getDismissAlert().isPresent()).toBe(false);
    });

    it('should check club joined, should not be able to delete club', function() {

        var heading = lobby.getClubHeading(club_name);
        expect(heading).toContain(club_name);
        expect(lobby.getClubMembers().getText()).toContain('2');

        lobby.getSettingsClubButton().click();
        expect(club.getTrashButton().isDisplayed()).toBeFalsy();

        club.getCloseClubPage().click();
    });

    it('change language to de', function() {
        lobby.getLanguageBtn().click();
        page.selectLanguageDe();
        page.getBtnBack().click();
    });

    it('verify de', function() {
        var title = lobby.getWelcomeHeading("Willkommen test.blind.valet");
        expect(title).toContain('Willkommen test.blind.valet');
    });
});
