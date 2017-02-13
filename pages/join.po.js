var joinPage = function (){

    var EC = protractor.ExpectedConditions;

    this.getEnterPassJoinInput = function(){
        return element(by.model('joinClub.joinPass'));
    };

};

module.exports = new joinPage();
