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
        return element(by.cssContainingText('.btn', 'Create Club'));
    };

    // Create Tournament modal functions

    this.getEnterTournamentNameInput = function(){
        return element(by.model('tournParams.tournName'));
    };

    this.getCreateTournamentButtonModal = function(){
        return element(by.cssContainingText('.btn', 'Create Tournament'));
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
