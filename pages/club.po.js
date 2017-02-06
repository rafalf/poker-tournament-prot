var clubPage = function (){

    var EC = protractor.ExpectedConditions;
    var lobby = require('../pages/lobby.po.js');

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
            console.log('club to delete: ' + c)
            for (var i = 0; i < c; i++) {
                lobby.getSettingsClubButton().click();
                $('#btn_open_delete_club').click();
                $('#btn_delete_club').click();
                console.log('club deleted')
            };
        });
    };

};

module.exports = new clubPage();
