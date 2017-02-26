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

    this.getClockLeftLiMenu = function(){
        return $('li#side_clock');
    };

    this.getSeatingLeftLiMenu = function(){
        return $('li#side_seating');
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
        // p.getText().then(function(players){
        //     console.log('Players: ' + players)
        // });
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

    this.getDrawSeatsFinalButton = function(){
        return $('#btn_tourn_seating_finalTableDraw');
    };

    this.getSeatsAddTableButton = function(){
        return $('#btn_tourn_addTable');
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

    // Draw Seats (pseudo modal )
    // *************************************************************************

    this.getCancelDrawSeats = function () {
        return $('#btn_tourn_cancel_drawSeats');
    };

    this.getConfirmDrawSeats = function () {
        return $('#btn_tourn_confirm_drawSeats');
    };

    this.getDecreasePlayersPerTableBtn = function () {
        return $('#btn_tourn_decr_perTable');
    };

    this.getIncreasePlayersPerTableBtn = function () {
        return $('#btn_tourn_incr_perTable');
    };

    this.getAddExtraSeatBtn = function () {
        return $('#btn_tourn_incr_extraSeats');
    };

    this.getSubstrExtraSeatBtn = function () {
        return $('#btn_tourn_decr_extraSeats');
    };

    this.getSeatsDrawMathText = function () {
        return $('[ng-show="appData.confirmSeatDraw"] h5.ng-binding').getText();
    };

    this.getAllSeatsTables = function () {
        return $$('.seating-grid .seat-card');

    };

    this.getAllPlayersPerTable = function (nth) {
        return $$('.seating-grid .seat-card:nth-of-type(' + nth + ') .seating-table-player');

    };



    //  parameters
    // *************************************************************************

    this.getTournSmallBlindParamInput = function () {
        return $('#row_init_small_blind input');
    };

    this.getTournSmallBlindParamPencil = function () {
        return $('#row_init_small_blind .fa-pencil-square-o');
    };

    this.enterTournSmallBlindParam = function (value) {
        var script_js = "document.getElementsByClassName('param-input').item(4).value = " + value + ";"
        browser.executeScript(script_js);
        this.getTournSmallBlindParamInput().sendKeys(protractor.Key.SPACE);
    };

    // -

    this.getTournStartingStackParamInput = function () {
        return $('#row_starting_stack input')
    };

    this.getTournStartingStackParamPencil = function () {
        return $('#row_starting_stack .fa-pencil-square-o')
    };

    this.getTournStartingStackParamCalc = function () {
        return $('#row_starting_stack .fa-calculator')
    };

    this.enterStartingStackParam = function (value) {
    };

    // -

    this.getTournLevelTimeParamInput = function () {
        return $('#row_level_time input');
    };

    this.getTournLevelTimeParamPencil = function () {
        return $('#row_level_time .fa-pencil-square-o');
    };

    this.enterTournLevelTimeParam = function (value) {
        var script_js = "document.getElementsByClassName('param-input').item(6).value = " + value + ";"
        browser.executeScript(script_js);
        this.getTournLevelTimeParamInput().sendKeys(protractor.Key.SPACE);
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

    this.getTournIncrDurationButton = function () {
        return $('#btn_tourn_bs_incr_duration');
    };

    this.enterTournDurationParam = function (value) {
        var script_js = "document.getElementsByClassName('param-input').item(3).value = " + value + ";"
        browser.executeScript(script_js);
        this.getTournDurationInput().sendKeys(protractor.Key.SPACE);
    };

    // -

    this.getTournBuyInInput = function () {
        return $('#row_buy-in input');
    };

    this.enterTournBuyInParam = function (value) {
        var script_js = "document.getElementsByClassName('param-input').item(15).value = " + value + ";"
        browser.executeScript(script_js);
        this.getTournBuyInInput().sendKeys(protractor.Key.SPACE);
    };


    // -

    this.getTournPlacesPaidInput = function () {
        return $('#row_places_paid input');
    };

    this.getTournPlacesPaidParamPencil = function () {
        return $('#row_places_paid .fa-pencil-square-o')
    };

    this.enterTournPlacesPaidParam = function (value) {
        // var jq_script_ = "$('#row_places_paid input').value = 5;"
        // browser.executeScript(jq_script_);

        var script_js = "document.getElementsByClassName('param-input').item(14).value = " + value + ";"
        browser.executeScript(script_js);
        this.getTournPlacesPaidInput().sendKeys(protractor.Key.SPACE);
    };

    // -

    this.getTournAddedPrizeInput = function () {
        return $('#row_addon_prize input')
    };

    this.enterTournAddedPrizeParam = function (value) {
        var script_js = "document.getElementsByClassName('param-input').item(18).value = " + value + ";"
        browser.executeScript(script_js);
        this.getTournAddedPrizeInput().sendKeys(protractor.Key.SPACE);
    };

    // -

    this.getTournRebuyCostInput = function () {
        return $('#row_rebuy_cost input')
    };

    this.enterTournRebuyCostParam = function (value) {
        var i = this.getTournRebuyCostInput()
        i.clear();
        i.sendKeys(value);
    };

    // -

    this.getTournAddOnCostInput = function () {
        return $('#row_addon_cost input')
    };

    this.enterTournAddOnCostParam = function (value) {
        var i = this.getTournAddOnCostInput()
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
        var cel = row.$("td:nth-of-type(" + nthCol + ")");
        return cel.getText();
    };

    //  Payouts
    // *************************************************************************

    this.getAllPayoutsRows = function(){
        return $$("table#payouts>tbody tr:not(.ng-hide)");
    };

    this.getPayoutsCell = function (nthRow, nthCell) {
        var row = $('table#payouts>tbody tr:not(.ng-hide):nth-of-type(' + nthRow + ')');
        var cell = row.$('td:nth-of-type(' + nthCell + ')');
        return cell.getText();
    };


    // edited
    // -------
    this.getPayoutsEditedCellInput = function (nthRow, nthCell) {
        var row = $('table#payouts>tbody tr:not(.ng-hide):nth-of-type(' + nthRow + ')');
        return row.$('td:nth-of-type(' + nthCell + ') input');
    };

    this.enterPayoutsCellInput = function (nthRow, value) {
        var row = $('table#payouts>tbody tr:not(.ng-hide):nth-of-type(' + nthRow + ')');
        var cell = row.$('td:nth-of-type(3) input');
        cell.clear();
        cell.sendKeys(value)
    };

    // info box
    // -------

    this.getPrizePoolInfoBox = function () {
        return $('#infobox_prizepool .bv-infobox-value').getText();
    };

    this.getPlayersInfoBox = function () {
        return $('#infobox_players .bv-infobox-value').getText();
    };

    this.getRebuysInfoBox = function () {
        return $('#infobox_rebuys .bv-infobox-value').getText();
    };

    this.getAddOnsInfoBox = function () {
        return $('#infobox_addons .bv-infobox-value').getText();
    };

    this.getPayoutsPencil = function () {
        return $('.payouts-table .btn-group .fa-pencil-square-o')
    };

    this.getPayoutsCalc = function () {
        return $('.payouts-table .btn-group .fa-calculator')
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
