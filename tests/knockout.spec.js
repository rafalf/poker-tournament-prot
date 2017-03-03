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
        expect(title).toContain('test.blindvalet');

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
        lobby.selectManagePayouts(false);
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

    it('should eliminate member by No 9', function () {

        tourn.getFirstActionsOnPlayerButton().click();
        tourn.getEliminationPlayerButton().click();
        tourn.getSelectKnockoutPlayer('Knockout Player Name9').click();
        tourn.getKnockoutButton().click();
    });

    it('should eliminate non member by No 9', function () {

        tourn.getFirstActionsOnPlayerButton().click();
        tourn.getEliminationPlayerButton().click();
        tourn.getSelectKnockoutPlayer('Knockout Player Name9').click();
        tourn.getKnockoutButton().click();
    });

    it('should verify players table', function(){
        expect(tourn.getAllPlayersTableRows().count()).toBe(11);
        expect(tourn.getPlayersTableCell(1, 1)).toBe('Knockout Player Name1');
        expect(tourn.getPlayersTableCell(1, 3)).toBe('25000');
        expect(tourn.getPlayersTableCell(1, 4)).toBe('');
        expect(tourn.getPlayersTableCell(1, 5)).toBe('Actions');

        expect(tourn.getPlayersTableCell(9, 1)).toBe('Knockout Player Name9');
        expect(tourn.getPlayersTableCell(9, 3)).toBe('25000');
        expect(tourn.getPlayersTableCell(9, 4)).toBe('2');
        expect(tourn.getPlayersTableCell(9, 5)).toBe('Actions');

        // knocked out players
        expect(tourn.getPlayersTableCell(10, 1)).toBe('Knockout Player Name0');
        expect(tourn.getPlayersTableCell(10, 3)).toBe('');
        expect(tourn.getPlayersTableCell(10, 4)).toBe('');

        expect(tourn.getPlayersTableCell(11, 1)).toBe('Knockout Player Name - Member');
        expect(tourn.getPlayersTableCell(11, 3)).toBe('');
        expect(tourn.getPlayersTableCell(11, 4)).toBe('');
    });

    it('should eliminate non member by No 5', function () {

        tourn.getFirstActionsOnPlayerButton().click();
        tourn.getEliminationPlayerButton().click();
        tourn.getSelectKnockoutPlayer('Knockout Player Name5').click();
        tourn.getKnockoutButton().click();
    });

    it('should verify players table and btns', function(){

        expect(tourn.getAllPlayersTableRows().count()).toBe(11);

        expect(tourn.getPlayersTableCell(1, 1)).toBe('Knockout Player Name2');
        expect(tourn.getPlayersTableCell(1, 3)).toBe('25000');
        expect(tourn.getPlayersTableCell(1, 4)).toBe('');
        expect(tourn.getPlayersTableCell(1, 5)).toBe('Actions');

        expect(tourn.getPlayersTableCell(4, 1)).toBe('Knockout Player Name5');
        expect(tourn.getPlayersTableCell(4, 3)).toBe('25000');
        expect(tourn.getPlayersTableCell(4, 4)).toBe('1');
        expect(tourn.getPlayersTableCell(4, 5)).toBe('Actions');

        expect(tourn.getPlayersTableCell(8, 1)).toBe('Knockout Player Name9');
        expect(tourn.getPlayersTableCell(8, 3)).toBe('25000');
        expect(tourn.getPlayersTableCell(8, 4)).toBe('2');
        expect(tourn.getPlayersTableCell(8, 5)).toBe('Actions');

        // knocked out players
        expect(tourn.getPlayersTableCell(9, 1)).toBe('Knockout Player Name1');
        expect(tourn.getPlayersTableCell(9, 3)).toBe('');
        expect(tourn.getPlayersTableCell(9, 4)).toBe('');

        expect(tourn.getPlayersTableCell(10, 1)).toBe('Knockout Player Name0');
        expect(tourn.getPlayersTableCell(10, 3)).toBe('');
        expect(tourn.getPlayersTableCell(10, 4)).toBe('');

        expect(tourn.getPlayersTableCell(11, 1)).toBe('Knockout Player Name - Member');
        expect(tourn.getPlayersTableCell(11, 3)).toBe('');
        expect(tourn.getPlayersTableCell(11, 4)).toBe('');

        expect(tourn.getRegisterPlayerButton().isDisplayed()).toBeTruthy();
        expect(tourn.getDrawSeatsButton().isDisplayed()).toBeTruthy();
        expect(tourn.getExportLeaderBoardButton().isDisplayed()).toBeFalsy();
    });

    it('should eliminate all other players by No 2', function () {

        for (var x = 0; x < 7; x++) {
            tourn.getLastActionsOnPlayerButton().click();
            tourn.getEliminationPlayerButton().click();
            tourn.getSelectKnockoutPlayer('Knockout Player Name2').click();
            tourn.getKnockoutButton().click();
        } ;
    });

    it('should verify players table and btns', function(){

        expect(tourn.getAllPlayersTableRows().count()).toBe(11);

        expect(tourn.getPlayersTableCell(1, 1)).toBe('Knockout Player Name2');
        expect(tourn.getPlayersTableCell(1, 3)).toBe('');
        expect(tourn.getPlayersTableCell(1, 4)).toBe('7');

        expect(tourn.getPlayersTableCell(11, 1)).toBe('Knockout Player Name - Member');
        expect(tourn.getPlayersTableCell(11, 3)).toBe('');
        expect(tourn.getPlayersTableCell(11, 4)).toBe('');

        expect(tourn.getRegisterPlayerButton().isDisplayed()).toBeFalsy()
        expect(tourn.getDrawSeatsButton().isDisplayed()).toBeFalsy()
        expect(tourn.getExportLeaderBoardButton().isDisplayed()).toBeTruthy();
    });

    it('should verify leaderboard table and btn', function () {

        tourn.getLeaderBoardTab().click();
        expect(tourn.getAllPlayersTableRows().count()).toBe(11);

        expect(tourn.getPlayersTableCell(1, 1)).toBe('1');
        expect(tourn.getPlayersTableCell(1, 2)).toBe('Knockout Player Name2');
        expect(tourn.getPlayersTableCell(1, 4)).toBe('');
        expect(tourn.getPlayersTableCell(1, 5)).toBe('7');

        expect(tourn.getRegisterPlayerButton().isDisplayed()).toBeFalsy()
        expect(tourn.getDrawSeatsButton().isDisplayed()).toBeFalsy()
        expect(tourn.getExportLeaderBoardButton().isDisplayed()).toBeTruthy();
    });

    it('should turn off knockouts', function () {
        tourn.getTournSettings().click();

        expect(tourn.getKnockoutCheckbox().isSelected()).toBeTruthy();
        tourn.getKnockoutCheckbox().click();

        tourn.getSaveTournSettings().click();
    });

    it('should verify leaderboard table and btn - knockouts not displaying', function () {

        tourn.getLeaderBoardTab().click();
        expect(tourn.getAllPlayersTableRows().count()).toBe(11);

        expect(tourn.getPlayersTableCell(1, 1)).toBe('1');
        expect(tourn.getPlayersTableCell(1, 2)).toBe('Knockout Player Name2');
        expect(tourn.getPlayersTableCell(1, 4)).toBe('');
        expect(tourn.getPlayersTableCell(1, 5)).toBe('');

        expect(tourn.getRegisterPlayerButton().isDisplayed()).toBeFalsy()
        expect(tourn.getDrawSeatsButton().isDisplayed()).toBeFalsy()
        expect(tourn.getExportLeaderBoardButton().isDisplayed()).toBeTruthy();
    });

    it('should click on players tab', function () {
        tourn.getPlayersTab().click();
    });

    it('should verify players table and btns - knockouts not displaying', function(){

        expect(tourn.getAllPlayersTableRows().count()).toBe(11);

        expect(tourn.getPlayersTableCell(1, 1)).toBe('Knockout Player Name2');
        expect(tourn.getPlayersTableCell(1, 3)).toBe('');
        expect(tourn.getPlayersTableCell(1, 4)).toBe('');

        expect(tourn.getPlayersTableCell(11, 1)).toBe('Knockout Player Name - Member');
        expect(tourn.getPlayersTableCell(11, 3)).toBe('');
        expect(tourn.getPlayersTableCell(11, 4)).toBe('');

        expect(tourn.getRegisterPlayerButton().isDisplayed()).toBeFalsy()
        expect(tourn.getDrawSeatsButton().isDisplayed()).toBeFalsy()
        expect(tourn.getExportLeaderBoardButton().isDisplayed()).toBeTruthy();
    });

    it('should verify tourn log and undo knockout ', function () {

        tourn.getTournLog().click();

        page.waitForModalPresent();

        page.waitUntilElementClickable(tourn.getAllLogUndoButtons().first());

        // 10 elim, 11 reg + create
        expect(tourn.getAllLogRows().count()).toBe(22);

        expect(tourn.getLogCell(1, 2)).toBe('Elimination: Knockout Player Name3')
        expect(tourn.getLogCell(2, 2)).toBe('Elimination: Knockout Player Name4')
        expect(tourn.getLogCell(21, 2)).toBe('Register: Knockout Player Name0')
        expect(tourn.getLogCell(22, 2)).toBe('Create Tournament')

        // 2 recent eliminations
        tourn.getAllLogUndoButtons().first().click();
        tourn.getAllLogUndoButtons().first().click();

        // first registration
        tourn.getAllLogUndoButtons().last().click();

        expect(tourn.getAllLogRows().count()).toBe(22);
        expect(tourn.getLogCell(1, 2)).toBe('Elimination: Knockout Player Name3')
        expect(tourn.getLogCell(2, 2)).toBe('Elimination: Knockout Player Name4')

        tourn.getLogCloseButton().click();

        page.waitForModalNotPresent();
    });

    it('should verify players table and btns - undo 2 eliminations and 1 reg', function(){

        expect(tourn.getAllPlayersTableRows().count()).toBe(10);

        expect(tourn.getPlayersTableCell(1, 1)).toBe('Knockout Player Name3');
        expect(tourn.getPlayersTableCell(1, 3)).toBe('25000');
        expect(tourn.getPlayersTableCell(1, 4)).toBe('');
        expect(tourn.getPlayersTableCell(1, 5)).toBe('Actions');

        expect(tourn.getPlayersTableCell(2, 1)).toBe('Knockout Player Name4');
        expect(tourn.getPlayersTableCell(2, 3)).toBe('25000');
        expect(tourn.getPlayersTableCell(2, 4)).toBe('');
        expect(tourn.getPlayersTableCell(2, 5)).toBe('Actions');

        expect(tourn.getPlayersTableCell(3, 1)).toBe('Knockout Player Name2');
        expect(tourn.getPlayersTableCell(3, 3)).toBe('25000');
        expect(tourn.getPlayersTableCell(3, 4)).toBe('');
        expect(tourn.getPlayersTableCell(3, 5)).toBe('Actions');
    });

    it('should verify leaderboard table and btn - undo 2 eliminations and 1 reg', function () {

        tourn.getLeaderBoardTab().click();
        expect(tourn.getAllPlayersTableRows().count()).toBe(10);

        expect(tourn.getPlayersTableCell(1, 1)).toBe('1');
        expect(tourn.getPlayersTableCell(1, 2)).toBe('Knockout Player Name2');
        expect(tourn.getPlayersTableCell(1, 3)).toBe('');
        expect(tourn.getPlayersTableCell(1, 4)).toBe('25000');
        expect(tourn.getPlayersTableCell(1, 6)).toBe('Actions');

        expect(tourn.getRegisterPlayerButton().isDisplayed()).toBeTruthy()
        expect(tourn.getDrawSeatsButton().isDisplayed()).toBeTruthy()
        expect(tourn.getExportLeaderBoardButton().isDisplayed()).toBeFalsy();
    });
});
