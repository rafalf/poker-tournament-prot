describe('tournament parameters case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var tourn = require('../pages/tournament.po.js');

    var testData = require("../confs/test.json");

    var tournament_name = 'Tournament-' + page.getRandomNumber();

    describe('parameters - no antes, no rebuy', function(){

        beforeAll(function(){
            console.log('\n-->  test spec: ' + __filename)
            browser.get(testData.login_url);
        });

        afterAll(function () {
            console.log('\n--->');
            browser.restart();
        });

        it('should log in', function () {

            login.getConnectEmailButton().click();

            login.getLoginEmailInput().sendKeys(testData.gmail_user);

            login.getLoginPasswordInput().sendKeys(testData.password);

            login.getLoginButton().click();
        });

        it('should verify heading', function () {

            page.waitForWelcomeHeading();

            var title = lobby.getWelcomeHeading('test.blindvalet');
            expect(title).toBe('Welcome test.blindvalet');

            lobby.closeCreateClubModalIfPresent();
        });

        it('should create a new club', function (){
            lobby.getAddClubMenu().click();

            var club_name = "Club-" + page.getRandomNumber();
            lobby.getEnterClubNameInput().sendKeys(club_name);
            lobby.getEnterClubPassword().sendKeys('pass');
            lobby.getCreateClubButton().click();
            page.waitForModalNotPresent();
        });

        it('should open a tournament modal', function() {

            lobby.getCreateTournamentButton().click();

            lobby.getEnterTournamentNameInput().clear();
            lobby.getEnterTournamentNameInput().sendKeys(tournament_name);
        });

        it('should enter tourn data: 100000, 10, 1-500, 10, 1500, buy-in:100, no rebuy', function () {

            lobby.enterTournPlayersInput('100000');
            lobby.enterTournDuration('10');
            lobby.selectChipSet('1,5,25,100,500');
            lobby.enterTournamentSmallBlind('10');
            lobby.enterTournStartStack('1500');
            lobby.enterTournBuyIn('100')
            lobby.selectAntes(true);
            lobby.selectRebuyTourn(false);
            lobby.selectKnockouts(true);
            lobby.selectManagePayouts(true);
            
        });

        it('should create a tournament', function () {

            lobby.getCreateTournamentButtonModal().click();

            headings = lobby.getAllTournamentHeadings();
            expect(headings).toContain(tournament_name);

            lobby.getFirstOpenTournamentButton().click();
        });

        it('should check parameters', function () {
            expect(tourn.getTournExpectedRebuysParamInput().isDisplayed()).toBeFalsy();
            expect(tourn.getTournRebuyChipsParamInput().isDisplayed()).toBeFalsy();
            expect(tourn.getTournExpectedAddonsParamInput().isDisplayed()).toBeFalsy();
            expect(tourn.getTournAddonChipsParamInput().isDisplayed()).toBeFalsy();

            expect(tourn.getTournAntesCheckbox().isSelected()).toBe(true);
            expect(tourn.getTournRebuyCheckbox().isSelected()).toBe(false);
        });

        it('should verify payouts', function () {
            tourn.getPayoutsLeftMenu().click();
            // expect(tourn.getTournBuyInInput().getAttribute('value')).toBe('100');
            // expect(tourn.getTournPlacesPaidInput().getAttribute('value')).toBe('1');
        });

        it('should register 10 players', function () {

            tourn.getPlayersLeftMenu().click();
            tourn.getRegisterPlayerButton().click();

            for (var i = 0; i < 10; i++) {
                tourn.enterPlayerName('Payout Name' + i);
                tourn.getRegisterButton().click();
            };

            tourn.getCloseButton().click();
            expect(tourn.getPlayersAllPlayersRows().count()).toBe(10);
        });

        it('should verify payouts', function () {
            tourn.getPayoutsLeftMenu().click();
        });


    });


});
