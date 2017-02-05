var tournamentPage = function (){

    var EC = protractor.ExpectedConditions;

    this.waitForTournament = function () {
        browser.wait(EC.presenceOf(this.getPlayersLeftMenu()), 10000, 'Tournament failed to load');
    };

    this.getPlayersLeftMenu = function(){
        return $('[ng-show="tournament.params.manageRegistrations"] span');
    };

    this.getPlayersPayouts = function(){
        return $('[ng-show="tournament.params.managePayouts"] span');
    };

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

    this.getCloseButton = function(){
        return $("#btn_tourn_register_close");
    };



};

module.exports = new tournamentPage();
