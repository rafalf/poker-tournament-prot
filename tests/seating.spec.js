describe('seating case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
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


    it('should create a new tournament and add 40 players', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading('test.blindvalet');
        expect(title).toBe('Welcome test.blindvalet');

        lobby.closeCreateClubModalIfPresent();

        // create a club
        lobby.getAddClubMenu().click();

        var club_name = "Club-" + page.getRandomNumber();
        lobby.getEnterClubNameInput().sendKeys(club_name);

        lobby.getEnterClubPassword().sendKeys('pass');

        lobby.getCreateClubButton().click();

        page.waitForModalNotPresent();

        // create a tournament
        lobby.getCreateTournamentButton().click();

        var tournament_name = 'Tournament-' + page.getRandomNumber();
        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys(tournament_name);

        lobby.enterTournPlayersInput('40');

        lobby.getCreateTournamentButtonModal().click();

        headings = lobby.getAllTournamentHeadings(tournament_name);
        expect(headings).toContain(tournament_name);

        lobby.getFirstOpenTournamentButton().click();

        tourn.getPlayersLeftMenu().click();

        expect(tourn.getPlayersLeftMenu().isDisplayed()).toBe(true)

        tourn.getRegisterPlayerButton().click();

        for (var i = 0; i < 40; i++) {
            tourn.enterPlayerName('Seating ' + i);
            tourn.getRegisterButton().click();
        };

        tourn.getCloseButton().click();

        expect(tourn.getPlayersCountHeading()).toBe('Players(40)');
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(40);
    });

    it('should verify left side menu', function () {
        expect(tourn.getSeatingLeftLiMenu().isDisplayed()).toBe(false);
        expect(tourn.getClockLeftLiMenu().isDisplayed()).toBe(true);
    });

    it('should cancel draw seats', function () {
        tourn.getDrawSeatsButton().click();
        tourn.getCancelDrawSeats().click();
        expect(tourn.getSeatingLeftLiMenu().isDisplayed()).toBe(false);
    });

    it('should decrease/increase players per table', function () {
        tourn.getDrawSeatsButton().click();
        expect(tourn.getSeatsDrawMathText()).toBe('(40  + 0) / 9 = 5 Tables');
        tourn.getDecreasePlayersPerTableBtn().click();
        expect(tourn.getSeatsDrawMathText()).toBe('(40  + 0) / 8 = 5 Tables');
        tourn.getIncreasePlayersPerTableBtn().click();
        expect(tourn.getSeatsDrawMathText()).toBe('(40  + 0) / 9 = 5 Tables');
    });

    it('should add 6 extra seats', function () {
        for (var x = 0; x < 6; x++) {
            tourn.getAddExtraSeatBtn().click();
        };
        expect(tourn.getSeatsDrawMathText()).toBe('(40  + 6) / 9 = 6 Tables');
    });

    it('should confirm seats', function () {
        tourn.getConfirmDrawSeats().click();
        expect(tourn.getSeatingLeftLiMenu().isDisplayed()).toBe(true);
    });
});
