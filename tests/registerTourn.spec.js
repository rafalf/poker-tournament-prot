describe('register Players for Tournament', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var tourn = require('../pages/tournament.po.js');


    var testData = require("../confs/test.json");

    beforeAll(function(){

        console.log('\n**********  test spec: ' + __filename + '  **********')

        browser.get(testData.login_url);

    });


    it('should create a new tournament and add 20 players - non members', function() {

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

        lobby.enterTournPlayersInput('20');

        lobby.getCreateTournamentButtonModal().click();

        headings = lobby.getAllTournamentHeadings();
        expect(headings).toContain(tournament_name);

        lobby.getFirstOpenTournamentButton().click();

        tourn.getPlayersLeftMenu().click();

        expect(tourn.getPlayersLeftMenu().isDisplayed()).toBe(true)

        tourn.getRegisterPlayerButton().click();

        for (var i = 0; i < 20; i++) {
            tourn.enterPlayerName('New Player Name' + i);
            tourn.getRegisterButton().click();
        };

        tourn.getCloseButton().click();

        expect(tourn.getPlayersCountHeading()).toBe('Players(20)');

    });

    it('should close register modal', function () {

        tourn.getRegisterPlayerButton().click();

        tourn.getCloseButton().click();

        expect(tourn.getPlayersCountHeading()).toBe('Players(20)');

    });

    it('should deregister 5 players', function () {

        for (var i = 0; i < 5; i++){

            tourn.getActionsOnPlayerButton().click();

            tourn.getUnregisterPlayerButton().click();
        }

        expect(tourn.getPlayersCountHeading()).toBe('Players(15)');

    });

    it('should register 1 player as member', function(){

        tourn.getRegisterPlayerButton().click();

        tourn.enterPlayerName('New Player Name - Member');
        tourn.getAddPlayerAsMemberCheckbox().click();
        tourn.getRegisterButton().click();

        tourn.getCloseButton().click();

        expect(tourn.getPlayersCountHeading()).toBe('Players(16)');

    });

    it('should get an alert that member exists', function(){

        tourn.getRegisterPlayerButton().click();
        tourn.enterPlayerName("New Player Name - Member");
        tourn.getAddPlayerAsMemberCheckbox().click();
        tourn.getRegisterButton().click();
        tourn.getCloseButton().click();

        expect(tourn.getPlayersCountHeading()).toBe("Players(16)");

        page.getDismissAlert().click();

    });

//    it('should pause', function(){
//
//        browser.pause();
//        browser.debugger();
//
//    });


});
