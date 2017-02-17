describe('knockouts in a tournament case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var tourn = require('../pages/tournament.po.js');


    var testData = require("../confs/test.json");
    var tournament_name = 'Tournament-Knockouts'

    beforeAll(function(){
        console.log('\n-->  test spec: ' + __filename)
        browser.get(testData.login_url);
    });

    afterAll(function () {
        console.log('\n--->');
        browser.restart();
    });


    it('should login, create a club', function() {

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

        var club_name = "Club-Knockouts"
        lobby.getEnterClubNameInput().sendKeys(club_name);

        lobby.getEnterClubPassword().sendKeys('pass');

        lobby.getCreateClubButton().click();

        page.waitForModalNotPresent();

        // create a tournament
        lobby.getCreateTournamentButton().click();

        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys(tournament_name);

    });

    it('should verify manage players and knockouts checkboxes', function () {

        lobby.selectManagePlayers(true);
        expect(lobby.getTournKnockouts().isDisplayed()).toBeTruthy();

        lobby.selectManagePlayers(false);
        expect(lobby.getTournKnockouts().isDisplayed()).toBeFalsy();

        lobby.selectManagePlayers(true);
        expect(lobby.getTournKnockouts().isDisplayed()).toBeTruthy();
    });

    it('should enter tourn data: 10, 10, 5-1000, 10, 1500, knockouts - true', function () {

        lobby.enterTournPlayersInput('10');
        lobby.enterTournDuration('10');
        lobby.selectChipSet('5,25,100,500,1000');
        lobby.enterTournamentSmallBlind('5');
        lobby.enterTournStartStack('25000');
        lobby.selectAntes(false);
        lobby.selectRebuyTourn(false);
        lobby.selectManagePlayers(true);
        lobby.selectKnockouts(true);
    });

    it('should create a tournament', function () {

        lobby.getCreateTournamentButtonModal().click();

        headings = lobby.getAllTournamentHeadings();
        expect(headings).toContain(tournament_name);

        lobby.getFirstOpenTournamentButton().click();
    });


    it('should register 10 players', function () {

        tourn.getPlayersLeftMenu().click();
        
        tourn.getRegisterPlayerButton().click();

        for (var i = 0; i < 10; i++) {
            tourn.enterPlayerName('Knockout Player Name' + i);
            tourn.getRegisterButton().click();
        };

        tourn.getCloseButton().click();

        expect(tourn.getPlayersCountHeading()).toBe('Players(10)');
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(10);
        expect(tourn.getPlayersCountHeading()).toBe('Players(10)');
    });

    it('should register 1 player as member', function(){

        tourn.getRegisterPlayerButton().click();

        tourn.enterPlayerName('Knockout Player Name - Member');
        tourn.getAddPlayerAsMemberCheckbox().click();
        tourn.getRegisterButton().click();

        tourn.getCloseButton().click();

        expect(tourn.getPlayersCountHeading()).toBe('Players(11)');
        expect(tourn.getPlayersAllPlayersRows().count()).toBe(11);
    });

    it('should eliminate member', function () {

        tourn.getFirstActionsOnPlayerButton().click();
        tourn.getEliminationPlayerButton().click();
        tourn.getSelectKnockoutPlayer('Knockout Player Name9').click();
        tourn.getKnockoutButton().click();
    });

    it('should eliminate non member', function () {

        tourn.getFirstActionsOnPlayerButton().click();
        tourn.getEliminationPlayerButton().click();
        tourn.getSelectKnockoutPlayer('Knockout Player Name9').click();
        tourn.getKnockoutButton().click();
    });

    it('should verify players', function(){
        expect(tourn.getAllPlayersTableRows().count()).toBe(11);
    });
});
