describe('quick start case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var club = require('../pages/club.po.js');
    var tourn = require('../pages/tournament.po.js');
    var clock = require('../pages/clock.po.js');

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
        expect(title).toContain('test.blindvalet');

        club.deleteAllClubs();

        page.waitUntilElementVisable(lobby.getQuickStartButton());
        expect(lobby.getQuickStartButton().isPresent()).toBeTruthy();
    });

    it('should quick start - new club', function() {

        lobby.getQuickStartButton().click();

        var heading = lobby.getClubHeading();
        expect(heading).toContain('(0)');
    });

    it('should quick start - create tournament', function() {

        page.waitUntilElementVisable(lobby.getEnterTournamentNameInput());

        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys('Quick Start!');

        lobby.getCreateTournamentButtonModal().click();

        page.waitForModalNotPresent();

        headings = lobby.getAllTournamentHeadings(1);
        expect(headings).toContain('Quick Start!');
    });

    it('club should have password', function() {

        lobby.getSettingsClubButton().click();

        expect(club.getClubPassword().getAttribute('value')).not.toBe('');
        expect(club.getClubName().getAttribute('value')).toBe('Club test.blindvalet')
    });

    it('clubs dont get deleted when delete cancelled', function() {

        club.getTrashButton().click();
        club.getCancelDeleteClubButton().click();
        expect(club.getClubName().getAttribute('value')).toBe('Club test.blindvalet')

        club.getCloseClubPage().click();
    });

    it('should go to clock - next and previous level', function () {
        lobby.getFirstOpenTournamentButton().click()
        tourn.getClockLeftMenu().click();

        expect(clock.getBlindsClockTableCell(1, 0).getText()).toBe('1');
        expect(clock.getBlindsClockTableCell(1, 1).getText()).toBe('5/10');

        clock.getClockNextLevel().click();

        expect(clock.getBlindsClockTableCell(1, 0).getText()).toBe('2');
        expect(clock.getBlindsClockTableCell(1, 1).getText()).toBe('10/20');

        clock.getClockPrevLevel().click();

        expect(clock.getBlindsClockTableCell(1, 0).getText()).toBe('1');
        expect(clock.getBlindsClockTableCell(1, 1).getText()).toBe('5/10');
    });
});
