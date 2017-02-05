describe('addClub', function() {

    // pages
    var page = require('../pages/page.po.js');
    var login = require('../pages/login.po.js');
    var lobby = require('../pages/lobby.po.js')

    var testData = require("../confs/test.json");

    beforeEach(function(){

        console.log('\n**********  test spec: ' + __filename + '  **********')

        browser.get(testData.login_url)

        browser.driver.manage().window().maximize();

    });

    afterEach(function () {

        console.log('\n**********')

        browser.restart()
    });


    it('should create a new tournament and add 5 players - non member', function() {

        login.getConnectEmailButton().click();

        login.getLoginEmailInput().sendKeys(testData.gmail_user);

        login.getLoginPasswordInput().sendKeys(testData.password);

        login.getLoginButton().click();

        page.waitForWelcomeHeading();

        var title = lobby.getWelcomeHeading();

        expect(title).toBe('Welcome test.blindvalet');

        lobby.getCreateTournamentButton().click();

        var tournament_name = 'Tournament-' + page.getRandomNumber();
        lobby.getEnterTournamentNameInput().clear();
        lobby.getEnterTournamentNameInput().sendKeys(tournament_name);

        lobby.getTournPlayersInput().sendKeys('5')

        lobby.getCreateTournamentButtonModal().click();

        headings = lobby.getAllTournamentHeadings();
        expect(headings).toContain(tournament_name);

        lobby.deleteFirstTournament();

        expect(headings.count()).toBe(0);

        lobby.getGetLogoutButton().click();

        page.waitForLaunchWindow();

    });

});
