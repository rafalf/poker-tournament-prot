var clockPage = function (){


    var page = require('../pages/page.po.js');
    var EC = protractor.ExpectedConditions;

    this.waitForTournament = function () {
        browser.wait(EC.presenceOf(this.getPlayersLeftMenu()), 10000, 'Tournament failed to load');
    };


    //  clock blinds table
    // *************************************************************************

    this.getBlindsClockTableRowData = function(row){
        var rows = $$(".tourn-clock-col1 table>tbody>tr:nth-of-type(" + row + ")>td");
        // rows.each(function (element, index) {
        //     element.getText().then(function(t) {
        //         console.log("Row : " + row + " Col: " + index, " Cell: " + t);
        //     });
        // });
        return rows;
    };

    this.getBlindsClockTableCell = function (row, col) {
        var r = this.getBlindsClockTableRowData(row);
        return r.get(col);
    };

    //  clock payout table
    // *************************************************************************

    this.getAllClockPayoutsRows = function () {
        return $$('.tourn-clock-col2 [ng-show="tournament.params.managePayouts"] tbody>tr')
    };

    this.getClockPayoutsRowData = function (row) {
        return $$('.tourn-clock-col2 [ng-show="tournament.params.managePayouts"] tbody>tr:nth-of-type(' + row + ')>td')
    };

    this.getClockPayoutsTableCell = function (row, col) {
        var r = this.getClockPayoutsRowData(row);
        return r.get(col);
    };
    
    
    //  
    // *************************************************************************
    
    this.getClockPlayers = function () {
        return $('.clock-players span')
    };

    this.getClockAverage = function () {
        return $('.clock-average span')
    };

    this.getClockNextLevel = function () {
        return $('#btn_tourn_nextLevel')
    };

    this.getClockPrevLevel = function () {
        return $('#btn_tourn_prevLevel')
    };
    
    
};

module.exports = new clockPage();
