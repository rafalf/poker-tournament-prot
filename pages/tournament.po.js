var tournamentPage = function (){

    var EC = protractor.ExpectedConditions;

    this.waitForTournament = function () {
        browser.wait(EC.presenceOf(this.getPlayersLeftMenu()), 10000, 'Tournament failed to load');
    };

    // Side left menu
    this.getBlindStructLeftMenu = function(){
        return $('#side_blind_structure span');
    };

    this.getPlayersLeftMenu = function(){
        return $('#side_players span');
    };

    this.getPlayersLeftLiMenu = function(){
        return $('li#side_players');
    };

    this.getPayoutsLeftMenu = function(){
        return $('#side_payouts span');
    };

    this.getPayoutsLeftLiMenu = function(){
        return $('li#side_payouts');
    };

    this.getClockLeftMenu = function(){
        return $('#side_clock span');
    };

    this.getPokerLobbyLeftMenu = function(){
        return $('#side_lobby span');
    };

    this.waitForPayoutsToSettle = function(d) {
        var payout = this.getPayoutsLeftLiMenu();
        if (d === "show"){
            payout.getAttribute('class').then(function(b){
                if (b != ''){
                    console.log('Must sleep for payouts to settle');
                    browser.sleep(2000);
                };
            });
        } else {
            payout.isDisplayed().then(function(b){
                if (b === 'ng-hide'){
                    console.log('Must sleep for payouts to settle');
                    browser.sleep(2000);
                };
            });
        };
    };

    //  ---


    this.getRegisterPlayerButton = function(){
        return $('#btn_tourn_open_manualRegister');
    };

    this.getPlayersCountHeading = function(){
        var h =  $('.tourn-main-left>h4').getText();
        h.then(function (text) {
            console.log("Players heading: " + text)
        });
        return h;
    };

    this.getPlayersAllPlayersRows = function(){
        p = $$('[id^="btn_tourn_player"]>td:nth-of-type(1)');
        p.getText().then(function(players){
            console.log('Players: ' + players)
        });
        return p;
    };

    this.getActionsOnPlayerButton = function(){
        return $('#btn_tourn_open_playerActions');
    };


    this.getUnregisterPlayerButton = function(){
        return $('#btn_tourn_unregisterPlayer');
    };


    // *************************************************************************
    //  Register a player modal
    // *************************************************************************

    this.enterPlayerName= function(name){
        return $("#newMemberName").sendKeys(name);
    };

    this.getRegisterButton = function(){
        return $("#btn_tourn_registerNew");
    };

    this.getRegisterMemberButton = function(){
        return $("#btn_tourn_registerMember");
    };


    this.getClubMemberTab = function(){
        return $("#tab_club_member div");
    };

    this.getMember = function(memberName){
        return element(by.cssContainingText('td', memberName))
    };

    this.getCloseButton = function(){
        return $("#btn_tourn_register_close");
    };

    this.getAddPlayerAsMemberCheckbox = function(){
        return element(by.model('data.addToClub'));
    };



};

module.exports = new tournamentPage();
