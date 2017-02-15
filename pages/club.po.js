var clubPage = function (){

    var EC = protractor.ExpectedConditions;
    var lobby = require('../pages/lobby.po.js');
    var page = require('../pages/page.po.js');

    this.getConfirmDeleteClubButton = function(){
        return $('#btn_delete_club');
    };

    this.getTrashButton = function(){
        return $('#btn_open_delete_club');
    };

    this.deleteClub =  function(){
        lobby.getSettingsClubButton().click();
        this.getTrashButton().click();
        this.getConfirmDeleteClubButton().click();
    };

    this.deleteAllClubs = function(){
        $$('.club-select option.ng-binding').count().then(function (c) {
            console.log('clubs to delete: ' + c)
            for (var i = 0; i < c; i++) {
                lobby.getClubHeading();
                lobby.getSettingsClubButton().click();
                browser.sleep(500);
                $('#btn_open_delete_club').click();
                browser.sleep(500);
                $('#btn_delete_club').click();
                browser.sleep(1000);
            };
        });
    };
};

module.exports = new clubPage();
