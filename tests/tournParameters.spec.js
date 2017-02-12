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
            console.log('\n**********  test spec: ' + __filename + '  **********')
            browser.get(testData.login_url);
        });

        afterAll(function () {
            console.log('\n**********')
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

        it('should enter tourn data: 100000, 10, 1-500, 10, 1500', function () {

            lobby.enterTournPlayersInput('100000');
            lobby.enterTournDuration('10');
            lobby.selectChipSet('1,5,25,100,500');
            lobby.enterTournamentSmallBlind('10');
            lobby.enterTournStartStack('1500');
            lobby.selectAntes(false);
            lobby.selectRebuyTourn(false);
        });

        it('should create a tournament', function () {

            lobby.getCreateTournamentButtonModal().click();

            headings = lobby.getAllTournamentHeadings();
            expect(headings).toContain(tournament_name);

            lobby.getFirstOpenTournamentButton().click();
        });

        it('should check parameters', function () {
            // expect(tourn.getTournExpectedRebuysInput().isDisplayed()).toBeFalsy();
            // expect(tourn.getTournRebuyChipsInput().isDisplayed()).toBeFalsy();
            // expect(tourn.getTournExpectedAddonsInput().isDisplayed()).toBeFalsy();
            // expect(tourn.getTournAddonChipsInput().isDisplayed()).toBeFalsy();

            expect(tourn.getTournAntesCheckbox().isSelected()).toBe(false);
            expect(tourn.getTournRebuyCheckbox().isSelected()).toBe(false);
        });
    });

    describe('parameters - antes, rebuy', function(){

        beforeAll(function(){
            console.log('\n**********  test spec: ' + __filename + '  **********')
            browser.get(testData.login_url);
        });

        afterAll(function () {
            console.log('\n**********')
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

        it('should enter tourn data: 150, 5, 100-25000, 10, 1500', function () {

            lobby.enterTournPlayersInput('150');
            lobby.enterTournDuration('5');
            lobby.selectChipSet('100,500,1000,5000,25000');
            lobby.selectAntes(true);
            lobby.selectRebuyTourn(true);
            lobby.enterTournRebuyChips('20000')
            lobby.enterTournAddonChips('30000')
        });

        it('should create a tournament', function () {

            lobby.getCreateTournamentButtonModal().click();

            headings = lobby.getAllTournamentHeadings();
            expect(headings).toContain(tournament_name);

            lobby.getFirstOpenTournamentButton().click();
        });

        it('should check parameters', function () {
            // expect(tourn.getTournExpectedRebuysInput().isDisplayed()).toBeTruthy();
            // expect(tourn.getTournRebuyChipsInput().isDisplayed()).toBeTruthy();
            // expect(tourn.getTournExpectedAddonsInput().isDisplayed()).toBeTruthy();
            // expect(tourn.getTournAddonChipsInput().isDisplayed()).toBeTruthy();

            expect(tourn.getTournAntesCheckbox().isSelected()).toBe(true);
            expect(tourn.getTournRebuyCheckbox().isSelected()).toBe(true);
        });


    });
});
