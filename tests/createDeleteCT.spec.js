describe('addClub', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var club = require('../pages/club.po.js');
    var tourn = require('../pages/tournament.po.js');

    var testData = require("../confs/test.json");

    beforeAll(function(){

        console.log('\n**********  test spec: ' + __filename + '  **********')

        browser.get(testData.login_url)
        browser.driver.manage().window().maximize();

    });

    afterEach(function () {
        console.log('\n**********')
    });

    it('should add a new club', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        lobby.closeCreateClubModalIfPresent();

        var title = lobby.getWelcomeHeading();

        expect(title).toBe('Welcome test.blindvalet');

        lobby.getAddClubMenu().click();

        var club_name = "Club-" + page.getRandomNumber();
        lobby.getEnterClubNameInput().sendKeys(club_name);

        lobby.getEnterClubPassword().sendKeys('pass');

        lobby.getCreateClubButton().click();

        var heading = lobby.getClubHeading();

        var expected_heading = club_name + '-Tournaments (0)'
        expect(heading).toBe(expected_heading);

    });

    it('should delete all tournaments', function() {

        lobby.deleteAllTournaments();

    });

    it('should create a new tournament and delete it', function() {

        lobby.closeCreateClubModalIfPresent();

        lobby.getCreateTournamentButton().click();

        var tournament_name = 'Tournament-' + page.getRandomNumber();
        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys(tournament_name);

        lobby.getCreateTournamentButtonModal().click();

        headings = lobby.getAllTournamentHeadings();
        expect(headings).toContain(tournament_name);

        expect(lobby.getRegisterButton().isDisplayed()).toBe(true);

        expect(headings.count()).toBe(1);

        lobby.deleteFirstTournament();

        expect(headings.count()).toBe(0);

    });

    it('should create a new tournament - manage players opt out', function() {

        lobby.closeCreateClubModalIfPresent();

        lobby.getCreateTournamentButton().click();

        var tournament_name = 'Tournament-' + page.getRandomNumber();
        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys(tournament_name);

        lobby.getManageRegistration().click();

        lobby.getCreateTournamentButtonModal().click();

        headings = lobby.getAllTournamentHeadings();
        expect(headings).toContain(tournament_name);

        lobby.getFirstOpenTournamentButton().click();

        expect(tourn.getBlindStructLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getPlayersLeftMenu().isDisplayed()).toBe(false);
        expect(tourn.getPayoutsLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getClockLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getPokerLobbyLeftMenu().isDisplayed()).toBe(true);

        tourn.getPokerLobbyLeftMenu().click();

        expect(lobby.getRegisterButton().isDisplayed()).toBe(false);

        expect(headings.count()).toBe(1);

        lobby.deleteFirstTournament();

        expect(headings.count()).toBe(0);

    });

    it('should create a new tournament - payouts opt out', function() {

        lobby.closeCreateClubModalIfPresent();

        lobby.getCreateTournamentButton().click();

        var tournament_name = 'Tournament-' + page.getRandomNumber();
        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys(tournament_name);

        lobby.getTournManagePayouts().click();

        lobby.getCreateTournamentButtonModal().click();

        headings = lobby.getAllTournamentHeadings();
        expect(headings).toContain(tournament_name);

        lobby.getFirstOpenTournamentButton().click();

        expect(tourn.getBlindStructLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getPlayersLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getPayoutsLeftMenu().isDisplayed()).toBe(false);
        expect(tourn.getClockLeftMenu().isDisplayed()).toBe(true);
        expect(tourn.getPokerLobbyLeftMenu().isDisplayed()).toBe(true);

        tourn.getPokerLobbyLeftMenu().click();

        expect(lobby.getRegisterButton().isDisplayed()).toBe(true);

        expect(headings.count()).toBe(1);

        lobby.deleteFirstTournament();

        expect(headings.count()).toBe(0);

    });

    it('should delete club', function () {

        club.deleteClub();

        lobby.closeCreateClubModalIfPresent();

        lobby.closeCreateClubModalIfPresent();

        lobby.getGetLogoutButton().click();

        page.waitForLaunchWindow();

    });

});
