var tournamentPage = function (){

    var EC = protractor.ExpectedConditions;

    this.waitForTournament = function () {
        browser.wait(EC.presenceOf(this.getPlayersLeftMenu()), 10000, 'Tournament failed to load');
    };

    // Side left menu
    // *************************************************************************
    
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

    //  Blinds table
    // *************************************************************************

    this.getBlindsTableRowData = function(row){
        var row = $$("span:not(.ng-hide) .blinds-table tbody>tr:nth-of-type(" + row + ")>td.ng-binding");
        // row.each(function (element, index) {
        //     element.getText().then(function(t) {
        //         console.log("Col: " + index, " Cell: " + t);
        //     });
        // });
        return row;
    };
    
    this.getBlindsTableCell = function (row, col) {
        var r = this.getBlindsTableRowData(row);
        return r.get(col);
    };

    this.getPencilBlinds = function(){
        return $('span:not(.ng-hide) .tourn-main-left .fa-pencil-square-o');
    };

    this.getCalcBlinds = function(){
        return $('span:not(.ng-hide) .tourn-main-left .fa-calculator');
    };

    this.getAllEditTournLevelButtons = function () {
        return $$('#btn_tourn_edit_level')
    };

    this.getAllTournLevelDelIcon = function () {
        return $$('#btn_tourn_delete_level')
    };

    this.getRegisterPlayerButton = function(){
        return $('#btn_tourn_open_manualRegister');
    };

    this.getOpenTournButton = function(){
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

    this.getLeaderBoardTab = function(){
        return $('#btn_tourn_leaderboardTab');
    };

    this.getTournLog = function(){
        return $('#btn_tourn_open_TournLog');
    };

    // actions
    // *************************************************************************
    
    this.getActionsOnPlayerButton = function(){
        return $('#btn_tourn_open_playerActions');
    };


    this.getUnregisterPlayerButton = function(){
        return $('#btn_tourn_unregisterPlayer');
    };

    this.getClosePlayerActionButton = function(){
        return $('#btn_tourn_close_playerActions');
    };


    // log
    // *************************************************************************

    this.getLogUndoButton = function(){
        return $('#btn_tourn_undoLogEntry');
    };

    this.getAllLogUndoButtons = function(){
        return $$('#btn_tourn_undoLogEntry');
    };

    this.getLogCloseButton = function(){
        return $('#btn_tourn_close_tournLog');
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
