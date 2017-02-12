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
        var s = ".float-buttons-left button:nth-of-type(2)"
        browser.wait(EC.elementToBeClickable($(s)), 5000);
        return $(s);
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

    this.enterTournDuration  = function(value){
        this.getTournDurationInput().clear();
        this.getTournDurationInput().sendKeys(value);
    };

    this.getTournBuyInInput = function(){
        return $("[name='buyin']");
    };

    this.getTournSmallBlindInput = function(){
        return $("[name='initSmallBlind']");
    };

    this.enterTournamentSmallBlind  = function(value){
        this.getTournSmallBlindInput().clear();
        this.getTournSmallBlindInput().sendKeys(value);
    };

    this.getTournStartStackInput = function(){
        return $("[name='startingStack']");
    };

    this.enterTournStartStack  = function(value){
        this.getTournStartStackInput().clear();
        this.getTournStartStackInput().sendKeys(value);
    };

    this.selectChipSet = function (value) {
        element(by.cssContainingText('select>option', value)).click();
    };

    this.getEnterTourRebuyChipsInput = function(){
        return element(by.model('tournParams.rebuyChips'));
    };

    this.enterTournRebuyChips  = function(value){
        this.getEnterTourRebuyChipsInput().clear();
        this.getEnterTourRebuyChipsInput().sendKeys(value);
    };

    this.getEnterTourAddonChipsInput = function(){
        return element(by.model('tournParams.addonChips'));
    };

    this.enterTournAddonChips  = function(value){
        this.getEnterTourAddonChipsInput().clear();
        this.getEnterTourAddonChipsInput().sendKeys(value);
    };

    // checkboxes
    //--------------------------------------------------------------------------

    this.getTournManagePayouts = function(){
        return  $("#input_managePayouts");
    };

    this.selectManagePayouts = function(checked){

        // true = select
        // false = deselect

        var p = this.getTournManagePayouts()
        if (checked === true){
            p.isSelected().then(function(s){
                if (s === false) {
                    $("#input_managePayouts").click();
                } else {
                    console.log('payouts already checked')
                };
            });
        } else {
            p.isSelected().then(function(s){
                if (s === true) {
                    $("#input_managePayouts").click();
                } else {
                    console.log('payouts already unchecked')
                };
            });
        };
    };

    this.getTournAntes = function(){
        return element(by.model('tournParams.antes'));
    };

    this.selectAntes = function(checked){

        // true = select
        // false = deselect

        var p = this.getTournAntes()
        if (checked === true){
            p.isSelected().then(function(s){
                if (s === false) {
                    p.click();
                } else {
                    console.log('antes already checked')
                };
            });
        } else {
            p.isSelected().then(function(s){
                if (s === true) {
                    p.click();
                } else {
                    console.log('antes already unchecked')
                };
            });
        };
    };
    

    this.getTournKnockouts = function(){
        return element(by.model('tournParams.trackKnockouts'));
    };

    this.getManageRegistration = function(){
        return element(by.model('tournParams.manageRegistrations'));
    };


    this.getRebuyTournament = function(){
        return element(by.model('tournParams.rebuyTournament'));
    };

    this.selectRebuyTourn = function(checked){

        // true = select
        // false = deselect

        var p = this.getRebuyTournament()
        if (checked === true){
            p.isSelected().then(function(s){
                if (s === false) {
                    p.click();
                } else {
                    console.log('rebuy already checked')
                };
            });
        } else {
            p.isSelected().then(function(s){
                if (s === true) {
                    p.click();
                } else {
                    console.log('rebuy already unchecked')
                };
            });
        };
    };


    this.getCreateTournamentButtonModal = function(){
        return $('#btn_create_tourn');
    };


    this.getWelcomeHeading = function(e){

        if (!e) {
            var title = $('#welcomeHdr');
            title.getText().then(function(t){
                console.log("Text: " + t)
            });
            return title.getText();
        } else {
            console.log('wait for heading:' + e)
            browser.wait(EC.presenceOf(element(by.cssContainingText('#welcomeHdr', e))), 5000,
                'Expected heading not present');
            return $('#welcomeHdr').getText();
        };
    };

    this.getClubHeading = function(){
        var h = $('.lobby-tourn-title h3');
        h.getText().then(function(t){
            console.log("Text: " + t)
        });
        return h.getText();
    };

    // Tournaments
    this.getAllTournamentHeadings = function(count){
        var headings = $$('.lobby-card h5');
        headings.getText().then(function(t){
            console.log("Tournament headings: " + t)
        });
        headings.count().then(function(c){
            if (count != c) {
                console.log('Must sleep for tournaments to appear');
                browser.sleep(2000);
                var headings = $$('.lobby-card h5');
                headings.getText().then(function(t){
                    console.log("Tournament headings: " + t)
                });
            };
        });
        return $$('.lobby-card h5').getText();
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

    this.getFirstOpenTournamentButton = function () {
        return this.getAllOpenTournamentButtons().first();
    };

    this.getAllTournaments = function(){
        return $$('.lobby-card h5');
    };

    this.getConfirmDeleteButton = function(){
        return $('#btn_confirmDeleteTourn');
    };

    this.getRegisterButton = function(){
        return $('#btn_registerTourn');
    };

    this.getAllRegisterButtons = function(){
        var buttons = $$('#btn_registerTourn');
        buttons.count().then(function(c){
            console.log("register buttons: " + c)
        });
        return buttons;
    };

    // Clubs
    this.getSettingsClubButton = function(){
        return $('.lobby-club button.btn-link');
    };
};

module.exports = new lobbyPage();
