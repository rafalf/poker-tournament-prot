describe('seating case', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js');
    var tourn = require('../pages/tournament.po.js');


    var testData = require("../confs/test.json");


    describe('seating case - 40 players', function() {


        beforeAll(function(){
            console.log('\n-->  test spec: ' + __filename)
            browser.get(testData.login_url);
        });

        afterAll(function () {
            console.log('\n--->');
            browser.restart()
        });


        it('should create a new tournament and add 40 players', function() {

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

            lobby.enterTournPlayersInput('40');

            lobby.getCreateTournamentButtonModal().click();

            page.waitForModalNotPresent();

            headings = lobby.getAllTournamentHeadings(tournament_name);
            expect(headings).toContain(tournament_name);

            lobby.getFirstOpenTournamentButton().click();

            tourn.getPlayersLeftMenu().click();

            expect(tourn.getPlayersLeftMenu().isDisplayed()).toBe(true);

            for (var rounds = 0; rounds < 4; rounds++) {

                tourn.getRegisterPlayerButton().click();
                for (var i = 0; i < 10; i++) {
                    tourn.enterPlayerName('Seating ' + i);
                    tourn.getRegisterButton().click();
                };
                tourn.getCloseButton().click();
            };

            expect(tourn.getPlayersCountHeading()).toBe('Players(40)');
            expect(tourn.getPlayersAllPlayersRows().count()).toBe(40);
        });

        it('should verify left side menu', function () {
            expect(tourn.getSeatingLeftLiMenu().isDisplayed()).toBe(false);
            expect(tourn.getClockLeftLiMenu().isDisplayed()).toBe(true);
        });

        it('should cancel draw seats', function () {
            tourn.getDrawSeatsButton().click();
            tourn.getCancelDrawSeats().click();
            expect(tourn.getSeatingLeftLiMenu().isDisplayed()).toBe(false);
        });

        it('should decrease/increase players per table', function () {
            tourn.getDrawSeatsButton().click();
            expect(tourn.getSeatsDrawMathText()).toBe('(40  + 0) / 9 = 5 Tables');
            tourn.getDecreasePlayersPerTableBtn().click();
            expect(tourn.getSeatsDrawMathText()).toBe('(40  + 0) / 8 = 5 Tables');
            tourn.getIncreasePlayersPerTableBtn().click();
            expect(tourn.getSeatsDrawMathText()).toBe('(40  + 0) / 9 = 5 Tables');
        });

        it('should add 6 extra seats', function () {
            for (var x = 0; x < 6; x++) {
                tourn.getAddExtraSeatBtn().click();
            };
            expect(tourn.getSeatsDrawMathText()).toBe('(40  + 6) / 9 = 6 Tables');
        });

        it('should confirm seats and verfiy tables count', function () {
            tourn.getConfirmDrawSeats().click();
            expect(tourn.getSeatingLeftLiMenu().isDisplayed()).toBe(true);
            expect(tourn.getAllSeatsTables().count()).toBe(6);
        });

        it('should remove extra seats and set 8 pl/table - verify table', function () {
            tourn.getDrawSeatsFinalButton().click();

            for (var i = 0; i < 6; i++){
                tourn.getSubstrExtraSeatBtn().click();
            };

            tourn.getDecreasePlayersPerTableBtn().click();
            tourn.getConfirmDrawSeats().click();

            expect(tourn.getAllSeatsTables().count()).toBe(5);

            expect(tourn.getAllPlayersPerTable(1).count()).toBe(8);
            expect(tourn.getAllPlayersPerTable(2).count()).toBe(8);
            expect(tourn.getAllPlayersPerTable(3).count()).toBe(8);
            expect(tourn.getAllPlayersPerTable(3).count()).toBe(8);
            expect(tourn.getAllPlayersPerTable(5).count()).toBe(8);

            expect(tourn.getAllPlayersPerTable(1).first().getText()).toContain('Seating')
            expect(tourn.getAllPlayersPerTable(1).last().getText()).toContain('Seating')

            expect(tourn.getSeatsBalanceTableButton().isDisplayed()).toBe(false);
        });

        it('should open tourn log and undo latest drew seats', function () {

            tourn.getTournLog().click();

            page.waitForModalPresent();

            page.waitUntilElementClickable(tourn.getAllLogUndoButtons().first());

            tourn.getAllLogUndoButtons().first().click();

            tourn.getLogCloseButton().click();

            page.waitForModalNotPresent();
        });

        it('should verfiy seats tables', function () {
            expect(tourn.getAllSeatsTables().count()).toBe(6);

            expect(tourn.getAllPlayersPerTable(1).count()).toBe(9);
            expect(tourn.getAllPlayersPerTable(2).count()).toBe(9);
            expect(tourn.getAllPlayersPerTable(3).count()).toBe(9);
            expect(tourn.getAllPlayersPerTable(3).count()).toBe(9);
            expect(tourn.getAllPlayersPerTable(5).count()).toBe(9);
        });
    });

    describe('seating case: 8 + 1 + 5 players', function() {


        beforeAll(function () {
            console.log('\n-->  test spec: ' + __filename)
            browser.get(testData.login_url);
        });

        afterAll(function () {
            console.log('\n--->');
            browser.restart();
        });


        it('should create a new tournament and add 8 players', function () {

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

            lobby.enterTournPlayersInput('13');

            lobby.getCreateTournamentButtonModal().click();

            page.waitForModalNotPresent();

            headings = lobby.getAllTournamentHeadings(tournament_name);
            expect(headings).toContain(tournament_name);

            lobby.getFirstOpenTournamentButton().click();

            tourn.getPlayersLeftMenu().click();

            expect(tourn.getPlayersLeftMenu().isDisplayed()).toBe(true);

            tourn.getRegisterPlayerButton().click();
            for (var i = 0; i < 8; i++) {
                tourn.enterPlayerName('Seating ' + i);
                tourn.getRegisterButton().click();
            }
            tourn.getCloseButton().click();

            expect(tourn.getPlayersCountHeading()).toBe('Players(8)');
        });

        it('draw seats', function () {
            tourn.getDrawSeatsButton().click();
            tourn.getConfirmDrawSeats().click();
            expect(tourn.getSeatingLeftLiMenu().isDisplayed()).toBe(true);
            expect(tourn.getAllSeatsTables().count()).toBe(1);
        });

        it('should add 1 player: not enough tables for 2', function () {
            tourn.getPlayersLeftMenu().click();
            tourn.getRegisterPlayerButton().click();

            for (var i = 0; i < 2; i++) {
                tourn.enterPlayerName('Extra Seat - Add 1 - ' + i);
                tourn.getRegisterButton().click();
            };

            tourn.getCloseButton().click();
            expect(tourn.getPlayersAllPlayersRows().count()).toBe(9);

            page.getDismissAlertClickable().click();

        });

        it('add 2 tables', function () {

            tourn.getSeatingLeftMenu().click()
            
            tourn.getSeatsAddTableButton().click();

            page.getDismissAlertClickable().click();
            
            tourn.getSeatsAddTableButton().click();

            page.getDismissAlertClickable().click();

            expect(tourn.getAllSeatsTables().count()).toBe(3);
            expect(tourn.getSeatsBalanceTableButton().isDisplayed()).toBe(false);

        });

        it('should add 5 players', function () {
            tourn.getPlayersLeftMenu().click();

            tourn.getRegisterPlayerButton().click();

            for (var i = 0; i < 5; i++) {
                tourn.enterPlayerName('Extra Seat - Add 2 - ' + i);
                tourn.getRegisterButton().click();
            };

            tourn.getCloseButton().click();
            expect(tourn.getPlayersAllPlayersRows().count()).toBe(14);

            page.getDismissAlertClickable().click();
        });

        it('should go to seats', function () {
            tourn.getSeatingLeftMenu().click();
            expect(tourn.getAllSeatsTables().count()).toBe(3);
        });

        it('should break table', function () {
            tourn.getSeatsBreakTableButton().click();
            expect(tourn.getAllSeatsTables().count()).toBe(2);

            expect(page.getNthAlert(0).getText()).toContain('Breaking table:');
            expect(page.getNthAlert(1).getText()).toContain('Seat Assignment');
            page.getDismissAlertClickable().click();
        });

        it('should balance table', function () {
            expect(tourn.getSeatsBalanceTableButton().isDisplayed()).toBe(true);
            tourn.getSeatsBalanceTableButton().click();
            expect(tourn.getAllSeatsTables().count()).toBe(2);

            expect(page.getNthAlert(0).getText()).toContain('Seat Assignment');
            page.getDismissAlertClickable().click();
        });
    });
});
