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
            expect(title).toContain('test.blindvalet');

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
            expect(tourn.getTournExpectedRebuysParamInput().isDisplayed()).toBeFalsy();
            expect(tourn.getTournRebuyChipsParamInput().isDisplayed()).toBeFalsy();
            expect(tourn.getTournExpectedAddonsParamInput().isDisplayed()).toBeFalsy();
            expect(tourn.getTournAddonChipsParamInput().isDisplayed()).toBeFalsy();

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
            expect(title).toContain('test.blindvalet');

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

        it('should enter tourn data: 150, 1, 100-25000, 10, 1500', function () {

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

        it('should verify parameters: blind rows: 28', function () {
            expect(tourn.getTournExpectedRebuysParamInput().isDisplayed()).toBeTruthy();
            expect(tourn.getTournRebuyChipsParamInput().isDisplayed()).toBeTruthy();
            expect(tourn.getTournExpectedAddonsParamInput().isDisplayed()).toBeTruthy();
            expect(tourn.getTournAddonChipsParamInput().isDisplayed()).toBeTruthy();

            expect(tourn.getTournAntesCheckbox().isSelected()).toBe(true);
            expect(tourn.getTournRebuyCheckbox().isSelected()).toBe(true);

            expect(tourn.getAllBlindsTableRows().count()).toBe(28);

            expect(tourn.getTournStartingStackParamInput().getAttribute('value')).toBe('20000');
            expect(tourn.getTournLevelTimeParamInput().getAttribute('value')).toBe('11');
            expect(tourn.getTournExpectedRebuysParamInput().getAttribute('value')).toBe('150');
            expect(tourn.getTournRebuyChipsParamInput().getAttribute('value')).toBe('20000');
            expect(tourn.getTournExpectedAddonsParamInput().getAttribute('value')).toBe('112');
            expect(tourn.getTournAddonChipsParamInput().getAttribute('value')).toBe('30000');
        });

        it('should turn off rebuy', function () {

            expect(tourn.getTournExpectedRebuysParamPencil().isDisplayed()).toBe(true);
            expect(tourn.getTournRebuyChipsParamPencil().isDisplayed()).toBe(true);
            expect(tourn.getTournExpectedAddonsParamPencil().isDisplayed()).toBe(true)
            expect(tourn.getTournAddonChipsParamPencil().isDisplayed()).toBe(true)

            tourn.getTournRebuyCheckbox().click();
            
            expect(tourn.getTournExpectedRebuysParamInput().isDisplayed()).toBeFalsy();
            expect(tourn.getTournRebuyChipsParamInput().isDisplayed()).toBeFalsy();
            expect(tourn.getTournExpectedAddonsParamInput().isDisplayed()).toBeFalsy();
            expect(tourn.getTournAddonChipsParamInput().isDisplayed()).toBeFalsy();

        });

        it('should edit params, click on pencils', function () {
            tourn.getTournStartingStackParamPencil().click();
            tourn.getTournSmallBlindParamPencil().click();
            tourn.getTournLevelTimeParamPencil().click();

            browser.ignoreSynchronization = true;
        });

        it('should set level time to 22: blind rows: 16', function () {
            tourn.enterTournLevelTimeParam(22);
        });

        it('should set initial small blind: 200', function () {
            tourn.enterTournSmallBlindParam(200);
        });

        it('verify blind table updated', function () {
            expect(tourn.getAllBlindsTableRows().count()).toBe(17);
        });

        it('should set starting stack - calc', function () {
            tourn.getTournStartingStackParamCalc().click();
        });

        it('verify blind table updated', function () {
            expect(tourn.getAllBlindsTableRows().count()).toBe(15);

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('22 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('200');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('400');
        });

        it('should recover from synchronization', function () {
            browser.ignoreSynchronization = false;
        });
    });

    describe('parameters - change duration', function(){

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
            expect(title).toContain('test.blindvalet');

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

        it('should enter tourn data: 150, 1, 100-25000, 10, 1500', function () {

            lobby.enterTournPlayersInput('150');
            lobby.enterTournDuration('5');
            lobby.selectChipSet('100,500,1000,5000,25000');
            lobby.selectAntes(false);
            lobby.selectRebuyTourn(false);
        });

        it('should create a tournament', function () {

            lobby.getCreateTournamentButtonModal().click();

            headings = lobby.getAllTournamentHeadings();
            expect(headings).toContain(tournament_name);

            lobby.getFirstOpenTournamentButton().click();
        });


        it('should verify blind table and param', function () {
            expect(tourn.getAllBlindsTableRows().count()).toBe(29);
            expect(tourn.getTournDurationInput().getAttribute('value')).toBe('5');
        });

        it('should increase duration', function () {
            tourn.getTournIncrDurationButton().click();
        });

        it('should verify blind table and param', function () {
            expect(tourn.getAllBlindsTableRows().count()).toBe(28);
            expect(tourn.getTournDurationInput().getAttribute('value')).toBe('5.5');
        });

        it('should edit params, click on pencils', function () {
            tourn.getTournStartingStackParamPencil().click();
            tourn.getTournSmallBlindParamPencil().click();
            tourn.getTournLevelTimeParamPencil().click();

            browser.ignoreSynchronization = true;
        });

        it('should set duration to an hour and 10 mins level', function () {

            tourn.enterTournLevelTimeParam(10);
            tourn.enterTournDurationParam(1);
        });

        it('should verify blind table and param', function () {
            expect(tourn.getAllBlindsTableRows().count()).toBe(7);
            expect(tourn.getTournDurationInput().getAttribute('value')).toBe('1');

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('10 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('100');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('200');
        });

        it('should recover from synchronization', function () {
            browser.ignoreSynchronization = false;
        });
    });
});
