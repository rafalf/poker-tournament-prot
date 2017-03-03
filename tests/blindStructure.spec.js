describe('blind structure case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var tourn = require('../pages/tournament.po.js');

    var testData = require("../confs/test.json");

    var tournament_name = 'Tournament-' + page.getRandomNumber();

    describe('blind structure - no antes, no rebuy', function(){

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
            lobby.selectKnockouts(false);

            expect(lobby.getEnterTourRebuyChipsInput().isDisplayed()).toBeFalsy();
            expect(lobby.getEnterTourAddonChipsInput().isDisplayed()).toBeFalsy();
        });

        it('should create a tournament', function () {

            lobby.getCreateTournamentButtonModal().click();

            headings = lobby.getAllTournamentHeadings();
            expect(headings).toContain(tournament_name);

            lobby.getFirstOpenTournamentButton().click();
        });

        it('should check blind table', function () {

            expect(tourn.getBlindStructLeftMenu().isDisplayed()).toBe(true);
            expect(tourn.getClockLeftMenu().isDisplayed()).toBe(true);
            expect(tourn.getPokerLobbyLeftMenu().isDisplayed()).toBe(true);

            expect(tourn.getBlindsTableRowData(1).count()).toBe(4);
            expect(tourn.getBlindsTableNotHiddenRowData(1).count()).toBe(3);

            expect(tourn.getBlindsTableCell(1, 0).getText()).toBe('1');
            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('10');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('20');

            expect(tourn.getBlindsTableCell(24, 0).getText()).toBe('24');
            expect(tourn.getBlindsTableCell(24, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(24, 2).getText()).toBe('6000');
            expect(tourn.getBlindsTableCell(24, 3).getText()).toBe('12000');
        });

        it('should edit blind - delete one level', function () {

            tourn.getPencilBlinds().click();
            tourn.getAllEditTournLevelButtons().first().click();
            tourn.getAllTournLevelDelIcon().first().click();
        });

        it('should check blind table - one level deleted', function () {

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('12');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('24');

            expect(tourn.getBlindsTableCell(23, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(23, 2).getText()).toBe('6000');
            expect(tourn.getBlindsTableCell(23, 3).getText()).toBe('12000');
        });

        it('should edit blind - edit one level', function () {

            tourn.getPencilBlinds().click();
            tourn.getAllEditTournLevelButtons().first().click();
            tourn.enterTournLevelTime('60');
            tourn.enterTournSmallBlind('20');
            tourn.enterTournBigBlind('35');
            tourn.getAllTournLevelSaveIcon().first().click();
        });

        it('should check blind table - one level edited', function () {

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('15');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('30');

            expect(tourn.getBlindsTableCell(2, 1).getText()).toBe('60 min');
            expect(tourn.getBlindsTableCell(2, 2).getText()).toBe('20');
            expect(tourn.getBlindsTableCell(2, 3).getText()).toBe('35');

            expect(tourn.getBlindsTableCell(23, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(23, 2).getText()).toBe('6000');
            expect(tourn.getBlindsTableCell(23, 3).getText()).toBe('12000');
        });

        it('should add new level', function () {

            tourn.getTournAddLevelButton().click();
            tourn.enterTournNewLevelTime('120');
            tourn.enterTournNewLevelSmallBlind('8000');
            tourn.getTournCreateNewLevelIcon().click();
        });

        it('should check blind table - new level added', function () {

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('15');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('30');

            expect(tourn.getBlindsTableCell(2, 1).getText()).toBe('60 min');
            expect(tourn.getBlindsTableCell(2, 2).getText()).toBe('20');
            expect(tourn.getBlindsTableCell(2, 3).getText()).toBe('35');

            expect(tourn.getBlindsTableCell(23, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(23, 2).getText()).toBe('6000');
            expect(tourn.getBlindsTableCell(23, 3).getText()).toBe('12000');

            expect(tourn.getBlindsTableCell(24, 1).getText()).toBe('120 min');
            expect(tourn.getBlindsTableCell(24, 2).getText()).toBe('8000');
            expect(tourn.getBlindsTableCell(24, 3).getText()).toBe('16000');
        });

        it('should add a break', function () {

            tourn.getTournAddBreakButton().click();
            tourn.enterTournNewBreakTime('15');
            tourn.enterTournNewBreakAfterLevel('1');
            tourn.getTournCreateBreakIcon().click();
        });

        it('should check blind table - break added', function () {

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('15');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('30');

            expect(tourn.getBlindsTableCell(2, 1).getText()).toBe('15 min');
            expect(tourn.getBlindsTableCell(2, 2).getText()).toBe('Break');
        });

        it('should edit blind - delete break', function () {

            tourn.getAllEditTournLevelButtons().get(1).click();
            tourn.getAllTournLevelDelIcon().first().click();
        });

        it('should check blind table - break deleted', function () {

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('15');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('30');

            expect(tourn.getBlindsTableCell(2, 1).getText()).toBe('60 min');
            expect(tourn.getBlindsTableCell(2, 2).getText()).toBe('20');
            expect(tourn.getBlindsTableCell(2, 3).getText()).toBe('35');
        });
    });


    describe('blind structure - antes, rebuy', function(){

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

        it('should enter tourn data: 150, 5, 100-25000, 10, 1500', function () {

            lobby.enterTournPlayersInput('150');
            lobby.enterTournDuration('5');
            lobby.selectChipSet('100,500,1000,5000,25000');
            lobby.selectAntes(true);
            lobby.selectRebuyTourn(true);
            lobby.selectKnockouts(false);
            lobby.enterTournRebuyChips('20000')
            lobby.enterTournAddonChips('30000')

            expect(lobby.getEnterTourRebuyChipsInput().isDisplayed()).toBeTruthy();
            expect(lobby.getEnterTourAddonChipsInput().isDisplayed()).toBeTruthy();
        });

        it('should create a tournament', function () {

            lobby.getCreateTournamentButtonModal().click();

            headings = lobby.getAllTournamentHeadings();
            expect(headings).toContain(tournament_name);

            lobby.getFirstOpenTournamentButton().click();
        });

        it('should check blind table', function () {

            expect(tourn.getBlindStructLeftMenu().isDisplayed()).toBe(true);
            expect(tourn.getClockLeftMenu().isDisplayed()).toBe(true);
            expect(tourn.getPokerLobbyLeftMenu().isDisplayed()).toBe(true);

            expect(tourn.getBlindsTableRowData(1).count()).toBe(4);
            expect(tourn.getBlindsTableNotHiddenRowData(1).count()).toBe(4);

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('11 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('100');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('200');

            expect(tourn.getBlindsTableNotHiddenCell(1, 3).getText()).toBe('-');

            expect(tourn.getBlindsTableCell(28, 1).getText()).toBe('11 min');
            expect(tourn.getBlindsTableCell(28, 2).getText()).toBe('250000');
            expect(tourn.getBlindsTableCell(28, 3).getText()).toBe('500000');

            expect(tourn.getBlindsTableNotHiddenCell(28, 3).getText()).toBe('75000');
        });

        it('should edit blind - edit ante', function () {

            tourn.getPencilBlinds().click();
            tourn.getAllEditTournLevelButtons().first().click();
            tourn.enterTournAnte('100.5');
            tourn.getAllTournLevelSaveIcon().first().click();
        });

        it('should check blind table', function () {

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('11 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('100');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('200');

            expect(tourn.getBlindsTableNotHiddenCell(1, 3).getText()).toBe('100.5');
        });

    });
});
