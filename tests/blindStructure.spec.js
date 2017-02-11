describe('blind structure case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var tourn = require('../pages/tournament.po.js');

    var testData = require("../confs/test.json");

    var tournament_name = 'Tournament-' + page.getRandomNumber();

    beforeAll(function(){
        console.log('\n**********  test spec: ' + __filename + '  **********')
        browser.get(testData.login_url);
    });

    afterAll(function () {
        console.log('\n**********')
        browser.restart();
    });


    describe('blind structure - no antes', function(){

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
        });

        it('should create a tournament', function () {

            lobby.getCreateTournamentButtonModal().click();

            headings = lobby.getAllTournamentHeadings();
            expect(headings).toContain(tournament_name);
        });

        it('should open tourn, check blinds table', function () {

            lobby.getFirstOpenTournamentButton().click();

            expect(tourn.getBlindStructLeftMenu().isDisplayed()).toBe(true);
            expect(tourn.getClockLeftMenu().isDisplayed()).toBe(true);
            expect(tourn.getPokerLobbyLeftMenu().isDisplayed()).toBe(true);

            expect(tourn.getBlindsTableRowData(1).count()).toBe(4);

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('10');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('20');

            expect(tourn.getBlindsTableCell(24, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(24, 2).getText()).toBe('6000');
            expect(tourn.getBlindsTableCell(24, 3).getText()).toBe('12000');
        });

        it('should edit blinds - delete one level', function () {

            tourn.getPencilBlinds().click();
            tourn.getAllEditTournLevelButtons().first().click();
            tourn.getAllTournLevelDelIcon().first().click();
        });

        it('should check blinds table', function () {

            expect(tourn.getBlindsTableCell(1, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(1, 2).getText()).toBe('12');
            expect(tourn.getBlindsTableCell(1, 3).getText()).toBe('24');

            expect(tourn.getBlindsTableCell(23, 1).getText()).toBe('25 min');
            expect(tourn.getBlindsTableCell(23, 2).getText()).toBe('6000');
            expect(tourn.getBlindsTableCell(23, 3).getText()).toBe('12000');

        });

    });
});
