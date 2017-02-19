var tournamentPage = function (){


    var page = require('../pages/page.po.js')
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

    //  Blind structure table
    // *************************************************************************

    this.getBlindsTableRowData = function(row){
        var rows = $$("span:not(.ng-hide) .blinds-table tbody>tr:nth-of-type(" + row + ")>td.ng-binding");
        // rows.each(function (element, index) {
        //     element.getText().then(function(t) {
        //         console.log("Col: " + index, " Cell: " + t);
        //     });
        // });
        return rows;
    };

    this.getAllBlindsTableRows = function(){
        return $$("span:not(.ng-hide) .blinds-table tbody>tr.ng-scope");
    };

    this.getBlindsTableCell = function (row, col) {
        var r = this.getBlindsTableRowData(row);
        return r.get(col);
    };

    this.getBlindsTableNotHiddenRowData = function(row){
        var row = $$("span:not(.ng-hide) .blinds-table tbody>tr:nth-of-type(" + row + ")>td.ng-scope:not(.ng-hide)");
        // row.each(function (element, index) {
        //     element.getText().then(function(t) {
        //         console.log("Col: " + index, " Cell: " + t);
        //     });
        // });
        return row;
    };

    this.getBlindsTableNotHiddenCell = function (row, col) {
        var r = this.getBlindsTableNotHiddenRowData(row);
        return r.get(col);
    };

    this.getPencilBlinds = function(){
        return $('span:not(.ng-hide) .tourn-main-left .fa-pencil-square-o');
    };

    this.getCalcBlinds = function(){
        return $('span:not(.ng-hide) .tourn-main-left .fa-calculator');
    };


    //  Players & LeaderBoard table
    // *************************************************************************

    this.getAllPlayersTableRows = function(){
        return $$("[ng-show=\"appData.tournTab=='players'\"] table tbody>tr.ng-scope");
    };


    this.getPlayersTableCell = function(nthRow, nthCol){
        var row = $("[ng-show=\"appData.tournTab=='players'\"] table tbody>tr.ng-scope:nth-of-type(" + nthRow + ")");
        var cell = row.$("td:nth-of-type(" + nthCol + ")");
        cell.getText().then(function (text_) {
            console.log("Cell row: " + nthRow + ' Col: ' + nthCol + " Value: " + text_);
        });
        return cell.getText();
    };


    // edit level
    // ---------------------------------------------

    this.getAllEditTournLevelButtons = function () {
        return $$('#btn_tourn_edit_level');
    };

    this.getAllTournLevelDelIcon = function () {
        return $$('#btn_tourn_delete_level');
    };

    this.getAllTournLevelSaveIcon = function () {
        return $$('#btn_tourn_saveLevel');
    };

    this.getTournLevelTimeInput = function () {
        return element(by.model('appData.levelToChange.levelTime'));
    };

    this.enterTournLevelTime = function (value) {
        var i = this.getTournLevelTimeInput()
        i.clear();
        i.sendKeys(value);
    };

    this.getTournSmallBlindInput = function () {
        return element(by.model('appData.levelToChange.sb'));
    };

    this.enterTournSmallBlind = function (value) {
        var i = this.getTournSmallBlindInput()
        i.clear();
        i.sendKeys(value);
    };

    this.getTournBigBlindInput = function () {
        return element(by.model('appData.levelToChange.bb'));
    };

    this.enterTournBigBlind = function (value) {
        var i = this.getTournBigBlindInput()
        i.clear();
        i.sendKeys(value);
    };

    this.getTournAddLevelButton = function () {
        return $('#btn_tourn_add_level');
    };

    this.enterTournNewLevelTime = function (value) {
        var i = element(by.model('appData.newLevel.levelTime'))
        i.clear();
        i.sendKeys(value);
    };

    this.enterTournNewLevelSmallBlind = function (value) {
        var i = element(by.model('appData.newLevel.sb'))
        i.clear();
        i.sendKeys(value);
    };

    this.getTournAnteInput = function () {
        return element(by.model('appData.levelToChange.ante'));
    };

    this.enterTournAnte = function (value) {
        var i = this.getTournAnteInput()
        i.clear();
        i.sendKeys(value);
    };

    this.getTournCreateNewLevelIcon = function(){
        return $('#btn_tourn_create_level');
    };

    this.enterTournNewBreakTime = function (value) {
        var i = element(by.model('appData.newBreak.levelTime'))
        i.clear();
        i.sendKeys(value);
    };

    this.enterTournNewBreakAfterLevel = function (value) {
        var i = element(by.model('appData.newBreak.afterLevel'))
        i.clear();
        i.sendKeys(value);
    };

    this.getTournCreateBreakIcon = function(){
        return $('#btn_tourn_create_break');
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

    this.getTournLog = function(){
        return $('#btn_tourn_open_TournLog');
    };

    // Btns
    // ------------------------------------------

    this.getRegisterPlayerButton = function(){
        return $('#btn_tourn_open_manualRegister');
    };

    this.getExportLeaderBoardButton = function(){
        return $('#btn_tourn_export_leaderboard');
    };

    this.getDrawSeatsButton = function(){
        return $('#btn_tourn_drawSeats');
    };

    this.getTournAddBreakButton = function () {
        return $('#btn_tourn_add_break');
    };

    // tabs
    // ------------------------------------------


    this.getLeaderBoardTab = function () {
        return $('#btn_tourn_leaderboardTab');
    };

    this.getPlayersTab = function () {
        return $('#btn_tourn_playersTab');
    };


    // Tournament Settings (pseudo modal )
    // *************************************************************************

    this.getTournSettings = function () {
        return $('#btn_tourn_open_tournSettings');
    };

    this.getSaveTournSettings = function () {
        return $('#btn_tourn_save_tournSettings');
    };

    this.getKnockoutCheckbox = function () {
        return element(by.model('appData.trackKnockouts'))
    };

    //  parameters
    // *************************************************************************

    this.getTournSmallBlindParamInput = function () {
        return $('#row_init_small_blind input')
    };

    this.getTournSmallBlindParamPencil = function () {
        return $('#row_init_small_blind .fa-pencil-square-o')
    };

    this.enterTournSmallBlindParam = function (value) {
        var i = this.getTournSmallBlindParamInput()
        i.clear();
        i.sendKeys(value);
    };

    // -

    this.getTournStartingStackParamInput = function () {
        return $('#row_starting_stack input')
    };

    this.getTournStartingStackParamPencil = function () {
        return $('#row_starting_stack .fa-pencil-square-o')
    };

    this.enterStartingStackParam = function (value) {
        var i = this.getTournStartingStackParamInput()
        i.clear();
        i.sendKeys(value);
    };

    // -

    this.getTournLevelTimeParamInput = function () {
        return $('#row_level_time input');
    };

    this.getTournLevelTimeParamPencil = function () {
        return $('#row_level_time .fa-pencil-square-o');
    };

    this.enterTournLevelTimeParam = function (value, clear_keys) {
        var i = this.getTournLevelTimeParamInput();
        i.clear();
        // for (var y = 0; y < clear_keys; y++){
        //     i.sendKeys(protractor.Key.BACK_SPACE);
        //     browser.sleep(500);
        // };
        i.sendKeys(value);
        browser.sleep(1000);
    };

    // -
    
    this.getTournExpectedRebuysParamInput = function () {
        return $('#row_exp_rebuys input');
    };

    this.getTournExpectedRebuysParamPencil = function () {
        return $('#row_exp_rebuys .fa-pencil-square-o');
    };

    this.enterTournExpectedRebuysParam = function (value) {
        var i = this.getTournExpectedRebuysParamInput()
        i.clear();
        i.sendKeys(value);
    };

    // -
    
    this.getTournRebuyChipsParamInput = function () {
        return $('#row_rebuy_chips input')
    };

    this.getTournRebuyChipsParamPencil = function () {
        return $('#row_rebuy_chips .fa-pencil-square-o')
    };

    this.enterTournRebuyChipsParam = function (value) {
        var i = this.getTournRebuyChipsParamInput()
        i.clear();
        i.sendKeys(value);
    };

    // -
    
    this.getTournExpectedAddonsParamInput = function () {
        return $('#row_exp_addons input')
    };

    this.getTournExpectedAddonsParamPencil = function () {
        return $('#row_exp_addons .fa-pencil-square-o')
    };

    this.enterTournExpectedAddonsParam = function (value) {
        var i = this.getTournExpectedAddonsParamInput()
        i.clear();
        i.sendKeys(value);
    };

    // -
    
    this.getTournAddonChipsParamInput = function () {
        return $('#row_addon_chips input')
    };

    this.getTournAddonChipsParamPencil = function () {
        return $('#row_addon_chips .fa-pencil-square-o')
    };

    this.enterTournAddonChipsParam = function (value) {
        var i = this.getTournAddonChipsParamInput()
        i.clear();
        i.sendKeys(value);
    };

    // -

    this.getTournDurationInput = function () {
        return $('#duration');
    };

    this.enterTournDurationParam = function (value) {
        var i = this.getTournDurationInput();
        i.clear();
        i.sendKeys(value);
        browser.sleep(1000);
    };

    // -

    this.getTournBuyInInput = function () {
        return element(by.model('tournament.params.buyin'))
    };

    this.enterTournBuyInParam = function (value) {
        var i = this.getTournBuyInInput()
        i.clear();
        i.sendKeys(value);
    };


    // -

    this.getTournPlacesPaidInput = function () {
        return element(by.model(''))
    };

    this.getTournPlacesPaidParamPencil = function () {
        return $('')
    };

    this.enterTournPlacesPaidParam = function (value) {
        var i = this.getTournPlacesPaidInput()
        i.clear();
        i.sendKeys(value);
    };

    // checkboxes

    this.getTournAntesCheckbox = function () {
        return $('#antes');
    };

    this.getTournRebuyCheckbox = function () {
        return $('#rebuyTournament');
    };


    // actions
    // *************************************************************************
    
    this.getActionsOnPlayerButton = function(){
        return $('#btn_tourn_open_playerActions');
    };

    this.getFirstActionsOnPlayerButton = function(){
        var first = $$('#btn_tourn_open_playerActions').first();
        page.waitUntilElementClickable(first);
        return first;
    };

    this.getLastActionsOnPlayerButton = function(){
        return $$('#btn_tourn_open_playerActions').last();
    };


    this.getUnregisterPlayerButton = function(){
        return $('#btn_tourn_unregisterPlayer');
    };

    this.getEliminationPlayerButton = function(){
        return $('#btn_tourn_eliminationPlayer');
    };

    this.getClosePlayerActionButton = function(){
        return $('#btn_tourn_close_playerActions');
    };

    // knockouts
    // *************************************************************************

    this.getSelectKnockoutPlayer = function(player){
        return element(by.cssContainingText('select option', player))
    };

    this.getKnockoutButton = function(){
        return $('#btn_tourn_knockout');
    };

    // Tourn log
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

    this.getAllLogRows = function(){
        return $$(".table tr[id*='log']");
    };

    this.getLogCell = function (nthRow, nthCol) {
        var row = $(".table tr[id*='log']:nth-of-type(" + nthRow + ")");
        var cel = row.$("td:nth-of-type(" + nthCol + ")")
        return cel.getText();
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
