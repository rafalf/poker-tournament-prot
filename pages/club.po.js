var clubPage = function (){

    var EC = protractor.ExpectedConditions;

    this.getConfirmDeleteClubButton = function(){
        return $('#btn_delete_club');
    };

    this.getTrashButton = function(){
        return $('#btn_open_delete_club');
    };

};

module.exports = new clubPage();
