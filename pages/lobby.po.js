var lobbyPage = function (){

    var EC = protractor.ExpectedConditions;

    // Left side menu
    this.getCardsMenu = function(){
        return $('.lobby-left img');
    };


    this.getAddClubMenu = function(){
        return $('.tourn-menu-cont ul:nth-of-type(1) img');
    };

    this.getProfileMenu = function(){
        return $('.tourn-menu-cont ul:nth-of-type(2) img');
    };

    this.getGetLogoutButton = function(){
        return element(by.css('.lobby-left-bottom'));
    };

    // Left side button - down the page
    this.getCreateTournamentButton = function(){
        return $('.float-buttons-left button:nth-of-type(2)');
    };

    this.getInviteMembersButton = function(){
        return $('.float-buttons-left button:nth-of-type(1)');
    };

    // Add club modal functions

    this.waitForCreateClub = function () {
        browser.wait(EC.presenceOf(this.getEnterClubNameInput()), 10000, 'Lobby failed to load');
    };

    this.getEnterClubNameInput = function(){
        return element(by.model('clubName'));
    };

    this.getEnterClubPassword = function(){
        return element(by.model('clubPass'));
    };

    this.getCreateClubButton = function(){
        return $('#btn_create_club')
    };

    this.getCancelClubButton = function(){
        return $('#btn_cancel_create_club');
    };

    this.closeCreateClubModalIfPresent = function () {
        this.getCancelClubButton().isPresent().then(function (result) {
            if (result){
                console.log('Add club present')
                $('#btn_cancel_create_club').click();
            }

        })

    }


    // *************************************************************************
    // Create Tournament Modal
    // *************************************************************************


    // inputs
    //--------------------------------------------------------------------------


    this.getEnterTournamentNameInput = function(){
        return element(by.model('tournParams.tournName'));
    };

    this.getTournDateInput = function(){
        return $("#input_tournDate");
    };

    this.getTournTimeInput = function(){
        return $("#input_tournTime");
    };

    this.getTournPlayersInput = function(){
        return $("[name='expPlayers']");
    };

    this.enterTournPlayersInput = function(players){
        el = this.getTournPlayersInput();
        el.clear();
        el.sendKeys(players);
    };

    this.getTournDurationInput = function(){
        return $("[name='duration']");
    };

    this.getTournBuyInInput = function(){
        return $("[name='buyin']");
    };

    this.getTournSmallBlindInput = function(){
        return $("[name='initSmallBlind']");
    };

    this.getTournStartStackInput = function(){
        return $("[name='startingStack']");
    };

    // checkboxes
    //--------------------------------------------------------------------------

    this.getTournManagePayouts = function(){
        return  $("#input_managePayouts");
    };

    this.getTournKnockouts = function(){
        return  element(by.model('tournParams.trackKnockouts'));
    };

    this.getManageRegistration = function(){
        return element(by.model('tournParams.manageRegistrations'));
    };

    this.getRebuyTournament = function(){
        return element(by.model('tournParams.rebuyTournament'));
    };


    this.getCreateTournamentButtonModal = function(){
        return $('#btn_create_tourn');
    };


    this.getWelcomeHeading = function(){
        var title = $('#welcomeHdr');
        title.getText().then(function(t){
            console.log("Text: " + t)
        });
        return title.getText();
    };

    this.getClubHeading = function(){
        var h = $('.lobby-tourn-title h3');
        h.getText().then(function(t){
            console.log("Text: " + t)
        });
        return h.getText();
    };

    // Tournaments
    this.getAllTournamentHeadings = function(){
        var headings = $$('.lobby-card h5');
        headings.getText().then(function(t){
            console.log("headings: " + t)
        });
        return headings.getText();
    };

    this.getAllDeleteTournamentButtons = function(){
        var buttons = $$('[id^="btn_deleteTourn"]');
        buttons.count().then(function(c){
            console.log("buttons: " + c)
        });
        return buttons;
    };

    this.deleteFirstTournament = function () {
        this.getAllDeleteTournamentButtons().first().click();
        this.getConfirmDeleteButton().click();
    };

    this.deleteAllTournaments = function () {
        this.getAllDeleteTournamentButtons().each(function (element, index) {
            element.click();
            $('#btn_confirmDeleteTourn').click();
        });
    };

    this.getAllOpenTournamentButtons = function(){
        var buttons = $$('#btn_openTourn');
        buttons.count().then(function(c){
            console.log("tournament buttons: " + c)
        });
        return buttons;
    };

    this.getFirstTournamentButton = function () {
        return this.getAllOpenTournamentButtons().first();
    };

    this.getAllTournaments = function(){
        return $$('.lobby-card h5');
    };

    this.getConfirmDeleteButton = function(){
        return $('#btn_confirmDeleteTourn');
    };

    // Clubs
    this.getSettingsClubButton = function(){
        return $('.lobby-club button.btn-link');
    };
};

module.exports = new lobbyPage();
