describe('add/delete club and tournament case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var club = require('../pages/club.po.js');
    var tourn = require('../pages/tournament.po.js');

    var testData = require("../confs/test.json");

    beforeAll(function(){

        console.log('\n-->  test spec: ' + __filename)
        browser.get(testData.login_url);

    });

    afterAll(function () {
        console.log('\n--->');
        browser.restart();
    });

    it('should login', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false);

        var title = lobby.getWelcomeHeading("test.blindvalet");
        expect(title).toContain('test.blindvalet');
    });

    it('change language to en', function() {
        lobby.getLanguageBtn().click();
        page.selectLanguageEn();
        page.getBtnBack().click();
    });

    it('verify en', function() {
        var title = lobby.getWelcomeHeading("Welcome test.blindvalet");
        expect(title).toContain('Welcome test.blindvalet');
    });

    it('should add a new club', function() {

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false);

        lobby.getAddClubMenu().click();

        var club_name = "Club-" + page.getRandomNumber();
        lobby.getEnterClubNameInput().sendKeys(club_name);

        lobby.getEnterClubPassword().sendKeys('pass');

        lobby.getCreateClubButton().click();

        page.waitForModalNotPresent();

        var heading = lobby.getClubHeading(club_name);
        expect(heading).toContain(club_name);
    });

    it('should delete all tournaments', function() {
        lobby.deleteAllTournaments();
    });

    it('should create a new tournament and delete it', function() {

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false)

        lobby.getCreateTournamentButton().click();

        var tournament_name = 'Tournament-' + page.getRandomNumber();
        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys(tournament_name);

        lobby.getCreateTournamentButtonModal().click();

        page.waitForModalNotPresent();

        headings = lobby.getAllTournamentHeadings(1);
        expect(headings).toContain(tournament_name);

        expect(lobby.getRegisterButton().isDisplayed()).toBe(true);

        expect(lobby.getAllTournamentHeadingsCount()).toBe(1);
    });

    it('should register on tourn card ', function () {

        expect(lobby.getRegisteredPlayersOnCard().getText()).toContain('0');
        lobby.getRegisterButton().click();
        expect(lobby.getRegisteredPlayersOnCard().getText()).toContain('1');
    });

    it('should deregister on tourn card ', function () {

        expect(lobby.getUnRegisterButton().isDisplayed()).toBeTruthy();
        expect(lobby.getRegisterButton().isDisplayed()).toBeFalsy();

        lobby.getUnRegisterButton().click();

        expect(lobby.getUnRegisterButton().isDisplayed()).toBeFalsy();
        expect(lobby.getRegisterButton().isDisplayed()).toBeTruthy();

        expect(lobby.getRegisteredPlayersOnCard().getText()).toContain('0');
    });

    it('should delete tournament', function () {

        lobby.deleteFirstTournament();
        expect(lobby.getAllTournamentHeadingsCount()).toBe(0);
    });

    it('should create a new tournament - manage players opt out', function() {

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false)

        lobby.getCreateTournamentButton().click();

        var tournament_name = 'Tournament-' + page.getRandomNumber();
        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys(tournament_name);

        lobby.selectManagePayouts(true);

        expect(lobby.getTournBuyInInput().isPresent()).toBe(true);

        lobby.getManageRegistration().click();

        lobby.getCreateTournamentButtonModal().click();

        page.waitForModalNotPresent();

        headings = lobby.getAllTournamentHeadings(1);
        expect(headings).toContain(tournament_name);

        lobby.getFirstOpenTournamentButton().click();

        expect(tourn.getBlindStructLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getPlayersLeftLiMenu().getAttribute('class')).toBe('ng-hide');
        expect(tourn.getPayoutsLeftLiMenu().getAttribute('class')).toBeFalsy();
        expect(tourn.getClockLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getPokerLobbyLeftMenu().isDisplayed()).toBe(true);

        tourn.getPokerLobbyLeftMenu().click();

        expect(lobby.getRegisterButton().isDisplayed()).toBe(false);

        expect(lobby.getAllTournamentHeadingsCount()).toBe(1);

        lobby.deleteFirstTournament();

        expect(lobby.getAllTournamentHeadingsCount()).toBe(0);
    });

    it('should create a new tournament - payouts opt out', function() {

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false);

        lobby.getCreateTournamentButton().click();

        var tournament_name = 'Tournament-' + page.getRandomNumber();
        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys(tournament_name);

        lobby.selectManagePayouts(false);

        expect(lobby.getTournBuyInInput().isPresent()).toBe(false);

        lobby.getCreateTournamentButtonModal().click();

        page.waitForModalNotPresent();

        headings = lobby.getAllTournamentHeadings(1);
        expect(headings).toContain(tournament_name);

        lobby.getFirstOpenTournamentButton().click();

//        tourn.waitForPayoutsToSettle('hide');

        expect(tourn.getBlindStructLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getPlayersLeftLiMenu().getAttribute('class')).toBeFalsy();
        expect(tourn.getPayoutsLeftLiMenu().getAttribute('class')).toBe('ng-hide');
        expect(tourn.getClockLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getPokerLobbyLeftMenu().isDisplayed()).toBe(true);

        tourn.getPokerLobbyLeftMenu().click();

        expect(lobby.getRegisterButton().isDisplayed()).toBe(true);

        expect(lobby.getAllTournamentHeadingsCount()).toBe(1);

        lobby.deleteFirstTournament();

        expect(lobby.getAllTournamentHeadingsCount()).toBe(0);
    });

    it('should delete club', function () {

        club.deleteClub();

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false);

        lobby.getGetLogoutButton().click();

        page.waitForLaunchWindow();
    });

});
