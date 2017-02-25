describe('payouts case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var tourn = require('../pages/tournament.po.js');

    var testData = require("../confs/test.json");

    var tournament_1 = 'Tournament-' + page.getRandomNumber();
    var tournament_2 = 'Tournament-' + page.getRandomNumber();

    describe('payouts - no rebuy', function(){

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
            lobby.getEnterTournamentNameInput().sendKeys(tournament_1);
        });

        it('should enter tourn data: 100000, 10, 1-500, 10, 1500, buy-in:100, no rebuy', function () {

            lobby.selectAntes(true);
            lobby.selectRebuyTourn(false);
            lobby.selectKnockouts(true);
            lobby.selectManagePayouts(true);
            
            lobby.enterTournPlayersInput('100000');
            lobby.enterTournDuration('10');
            lobby.selectChipSet('1,5,25,100,500');
            lobby.enterTournamentSmallBlind('10');
            lobby.enterTournStartStack('1500');
            lobby.enterTournBuyIn('100')
        });

        it('should create a tournament', function () {

            lobby.getCreateTournamentButtonModal().click();

            headings = lobby.getAllTournamentHeadings(tournament_1);
            expect(headings).toContain(tournament_1);

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

        it('should verify payouts with 0 players', function () {
            tourn.getPayoutsLeftMenu().click();
            expect(tourn.getTournBuyInInput().getAttribute('value')).toBe('100');
            expect(tourn.getTournPlacesPaidInput().getAttribute('value')).toBe('1');
            expect(tourn.getTournAddedPrizeInput().getAttribute('value')).toBe('0');

            expect(tourn.getAllPayoutsRows().count()).toBe(1);

            expect(tourn.getPrizePoolInfoBox()).toBe('0');
            expect(tourn.getPlayersInfoBox()).toBe('0')
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

        it('should verify payouts: 10 players, 3 places paid', function () {
            tourn.getPayoutsLeftMenu().click();

            expect(tourn.getTournBuyInInput().getAttribute('value')).toBe('100');
            expect(tourn.getTournPlacesPaidInput().getAttribute('value')).toBe('3');
            expect(tourn.getTournAddedPrizeInput().getAttribute('value')).toBe('0');

            expect(tourn.getAllPayoutsRows().count()).toBe(3);

            expect(tourn.getPayoutsCell(1, 2)).toBe('525');
            expect(tourn.getPayoutsCell(2, 2)).toBe('300');
            expect(tourn.getPayoutsCell(3, 2)).toBe('175');

            expect(tourn.getPrizePoolInfoBox()).toBe('1000');
            expect(tourn.getPlayersInfoBox()).toBe('10')
        });

        it('should change 1rst paid place', function () {

            tourn.getPayoutsPencil().click();
            tourn.enterPayoutsCellInput(1, 600);
        });

        it('should verify payouts 1st placed edited', function () {

            expect(tourn.getAllPayoutsRows().count()).toBe(4);

            expect(tourn.getPayoutsEditedCellInput(1, 3).getAttribute('value')).toBe('600');
            expect(tourn.getPayoutsEditedCellInput(2, 3).getAttribute('value')).toBe('300');
            expect(tourn.getPayoutsEditedCellInput(3, 3).getAttribute('value')).toBe('175');
            expect(tourn.getPayoutsCell(4, 2)).toBe('1075 (+75)');

            expect(tourn.getPrizePoolInfoBox()).toBe('1000');
            expect(tourn.getPlayersInfoBox()).toBe('10');
        });


        it('should reset payouts, select calculator', function () {

            tourn.getPayoutsCalc().click();

            expect(tourn.getAllPayoutsRows().count()).toBe(3);

            expect(tourn.getPayoutsCell(1, 2)).toBe('525');
            expect(tourn.getPayoutsCell(2, 2)).toBe('300');
            expect(tourn.getPayoutsCell(3, 2)).toBe('175');

            expect(tourn.getPrizePoolInfoBox()).toBe('1000');
            expect(tourn.getPlayersInfoBox()).toBe('10');
        });
        
        it('should add places paid', function () {

            tourn.getTournPlacesPaidParamPencil().click();
            tourn.enterTournPlacesPaidParam(4);
        });

        it('should verify payouts: 10 players, 4 places paid', function () {

            expect(tourn.getAllPayoutsRows().count()).toBe(4);

            expect(tourn.getPayoutsCell(1, 2)).toBe('425');
            expect(tourn.getPayoutsCell(2, 2)).toBe('275');
            expect(tourn.getPayoutsCell(3, 2)).toBe('175');
            expect(tourn.getPayoutsCell(4, 2)).toBe('125');

            expect(tourn.getPrizePoolInfoBox()).toBe('1000');
            expect(tourn.getPlayersInfoBox()).toBe('10')
        });
    });

    describe('payouts - rebuy', function(){

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
            lobby.getEnterTournamentNameInput().sendKeys(tournament_2);
        });

        it('should enter tourn data: 100000, 10, 1-500, 10, 1500, buy-in:100, no rebuy', function () {

            lobby.selectAntes(true);
            lobby.selectRebuyTourn(true);
            lobby.selectKnockouts(true);
            lobby.selectManagePayouts(true);
            
            lobby.enterTournPlayersInput('100000');
            lobby.enterTournDuration('10');
            lobby.selectChipSet('1,5,25,100,500');
            lobby.enterTournamentSmallBlind('10');
            lobby.enterTournStartStack('1500');
            lobby.enterTournBuyIn('100');

        });

        it('should create a tournament', function () {

            lobby.getCreateTournamentButtonModal().click();

            headings = lobby.getAllTournamentHeadings(tournament_2);
            expect(headings).toContain(tournament_2);

            lobby.getFirstOpenTournamentButton().click();
        });

        it('should check parameters', function () {
            expect(tourn.getTournExpectedRebuysParamInput().isDisplayed()).toBeTruthy();
            expect(tourn.getTournRebuyChipsParamInput().isDisplayed()).toBeTruthy();
            expect(tourn.getTournExpectedAddonsParamInput().isDisplayed()).toBeTruthy();
            expect(tourn.getTournAddonChipsParamInput().isDisplayed()).toBeTruthy();

            expect(tourn.getTournAntesCheckbox().isSelected()).toBe(true);
            expect(tourn.getTournRebuyCheckbox().isSelected()).toBe(true);
        });

        it('should verify payouts: 0 players', function () {
            tourn.getPayoutsLeftMenu().click();
            expect(tourn.getTournBuyInInput().getAttribute('value')).toBe('100');
            expect(tourn.getTournPlacesPaidInput().getAttribute('value')).toBe('1');
            expect(tourn.getTournAddedPrizeInput().getAttribute('value')).toBe('0');
            expect(tourn.getTournRebuyCostInput().getAttribute('value')).toBe('100');
            expect(tourn.getTournAddOnCostInput().getAttribute('value')).toBe('100');

            expect(tourn.getAllPayoutsRows().count()).toBe(1);

            expect(tourn.getPrizePoolInfoBox()).toBe('0');
            expect(tourn.getPlayersInfoBox()).toBe('0');
            expect(tourn.getRebuysInfoBox()).toBe('0');
            expect(tourn.getAddOnsInfoBox()).toBe('0');
        });

        it('should register 6 players', function () {

            tourn.getPlayersLeftMenu().click();
            tourn.getRegisterPlayerButton().click();

            for (var i = 0; i < 6; i++) {
                tourn.enterPlayerName('Payout Name' + i);
                tourn.getRegisterButton().click();
            };

            tourn.getCloseButton().click();
            expect(tourn.getPlayersAllPlayersRows().count()).toBe(6);
        });

        it('should verify payouts: 6 players, 2 places paid', function () {
            tourn.getPayoutsLeftMenu().click();

            expect(tourn.getTournBuyInInput().getAttribute('value')).toBe('100');
            expect(tourn.getTournPlacesPaidInput().getAttribute('value')).toBe('2');
            expect(tourn.getTournAddedPrizeInput().getAttribute('value')).toBe('0');

            expect(tourn.getAllPayoutsRows().count()).toBe(2);

            expect(tourn.getPayoutsCell(1, 2)).toBe('375');
            expect(tourn.getPayoutsCell(2, 2)).toBe('225');

            expect(tourn.getPrizePoolInfoBox()).toBe('600');
            expect(tourn.getPlayersInfoBox()).toBe('6');
            expect(tourn.getRebuysInfoBox()).toBe('0');
            expect(tourn.getAddOnsInfoBox()).toBe('0');
        });

        it('should deduct places paid', function () {

            tourn.getTournPlacesPaidParamPencil().click();
            tourn.enterTournPlacesPaidParam(1);
        });

        it('should verify payouts: 6 players, 1 place paid', function () {
            tourn.getPayoutsLeftMenu().click();

            expect(tourn.getTournBuyInInput().getAttribute('value')).toBe('100');
            expect(tourn.getTournPlacesPaidInput().getAttribute('value')).toBe('1');
            expect(tourn.getTournAddedPrizeInput().getAttribute('value')).toBe('0');

            expect(tourn.getAllPayoutsRows().count()).toBe(1);

            expect(tourn.getPayoutsCell(1, 2)).toBe('600');

            expect(tourn.getPrizePoolInfoBox()).toBe('600');
            expect(tourn.getPlayersInfoBox()).toBe('6');
            expect(tourn.getRebuysInfoBox()).toBe('0');
            expect(tourn.getAddOnsInfoBox()).toBe('0');
        });

        it('should add prize - 1000', function () {
            tourn.enterTournAddedPrizeParam(1000);
        });

        it('should verify payouts: 6 players, 1 place paid, 1000 prize', function () {
            tourn.getPayoutsLeftMenu().click();

            expect(tourn.getAllPayoutsRows().count()).toBe(1);

            expect(tourn.getPayoutsCell(1, 2)).toBe('1600');

            expect(tourn.getPrizePoolInfoBox()).toBe('1600');
            expect(tourn.getPlayersInfoBox()).toBe('6');
            expect(tourn.getRebuysInfoBox()).toBe('0');
            expect(tourn.getAddOnsInfoBox()).toBe('0');
        });

        it('should increase buy in - 1000', function () {
            tourn.enterTournBuyInParam(1000);
        });

        it('should verify payouts: 6 players, 1 place paid, 1000 prize, 1000 buyin', function () {
            tourn.getPayoutsLeftMenu().click();

            expect(tourn.getAllPayoutsRows().count()).toBe(1);

            expect(tourn.getPayoutsCell(1, 2)).toBe('7000');

            expect(tourn.getPrizePoolInfoBox()).toBe('7000');
            expect(tourn.getPlayersInfoBox()).toBe('6');
            expect(tourn.getRebuysInfoBox()).toBe('0');
            expect(tourn.getAddOnsInfoBox()).toBe('0');

            expect(tourn.getTournRebuyCostInput().getAttribute('value')).toBe('1000');
            expect(tourn.getTournAddOnCostInput().getAttribute('value')).toBe('1000');
        });
    });
});
