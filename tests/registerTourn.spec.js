describe('register players for a tournament case', function() {

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


    it('should create a new tournament and add 20 players - non members', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading('test.blindvalet');
        expect(title).toContain('test.blindvalet');

        lobby.closeCreateClubModalIfPresent();
        expect(lobby.getQuickStartButton().isPresent()).toBe(false);

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

        page.waitForModalNotPresent();

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
        page.waitForModalNotPresent();

        expect(tourn.getPlayersCountHeading()).toContain('(20)');
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(20);
    });

    it('should close register modal', function () {

        tourn.getRegisterPlayerButton().click();
        tourn.getCloseButton().click();
        page.waitForModalNotPresent();

        expect(tourn.getPlayersCountHeading()).toContain('(20)');
    });

    it('should deregister 5 players', function () {

        for (var i = 0; i < 5; i++){
            tourn.getFirstActionsOnPlayerButton().click();
            tourn.getUnregisterPlayerButton().click();
        };

        expect(tourn.getPlayersCountHeading()).toContain('(15)');
    });

    it('should register 1 player as member', function(){

        tourn.getRegisterPlayerButton().click();

        tourn.enterPlayerName('New Player Name - Member');
        tourn.getAddPlayerAsMemberCheckbox().click();
        tourn.getRegisterButton().click();

        tourn.getCloseButton().click();
        page.waitForModalNotPresent();

        expect(tourn.getPlayersCountHeading()).toContain('(16)');
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(16);
    });

    it('should get an alert that member exists', function(){

        tourn.getRegisterPlayerButton().click();
        tourn.enterPlayerName("New Player Name - Member");
        tourn.getAddPlayerAsMemberCheckbox().click();
        tourn.getRegisterButton().click();
        tourn.getCloseButton().click();
        page.waitForModalNotPresent();

        expect(tourn.getPlayersCountHeading()).toContain("(16)");
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(16);

        page.getDismissAlertClickable().click();
    });


    it('should unregister 1 member', function () {

        tourn.getFirstActionsOnPlayerButton().click();
        tourn.getUnregisterPlayerButton().click();
        expect(tourn.getPlayersCountHeading()).toContain('(15)');
    });


    it('should add member from the list of members', function(){

        tourn.getRegisterPlayerButton().click();
        tourn.getClubMemberTab().click();
        tourn.getMember("New Player Name - Member").click();
        tourn.getRegisterMemberButton().click();
        tourn.getCloseButton().click();
        page.waitForModalNotPresent();

        expect(tourn.getPlayersCountHeading()).toContain("(16)");
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(16);
    });


    it('should register himself', function(){

        tourn.getRegisterPlayerButton().click();
        tourn.getClubMemberTab().click();
        tourn.getMember(testData.user_name).click();
        tourn.getRegisterMemberButton().click();
        tourn.getCloseButton().click();
        page.waitForModalNotPresent();

        expect(tourn.getPlayersCountHeading()).toContain("(17)");
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(17);
    });


    it('should deregister 1 player on leaderboard', function () {


        tourn.getLeaderBoardTab().click();

        tourn.getActionsOnPlayerButton().click();

        tourn.getUnregisterPlayerButton().click();

        expect(tourn.getPlayersCountHeading()).toContain('(16)');
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(16);
    });

    it('should close player action on leaderboard', function () {


        tourn.getLeaderBoardTab().click();

        tourn.getActionsOnPlayerButton().click();

        tourn.getClosePlayerActionButton().click();

        expect(tourn.getPlayersCountHeading()).toContain('(16)');
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(16);
    });


    it('should open tourn log and undo player registration', function () {

        tourn.getTournLog().click();

        page.waitForModalPresent();

        page.waitUntilElementClickable(tourn.getAllLogUndoButtons().first());

        tourn.getAllLogUndoButtons().first().click();

        tourn.getLogCloseButton().click();
        page.waitForModalNotPresent();

        expect(tourn.getPlayersCountHeading()).toContain('(15)');
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(15);
    });

});
