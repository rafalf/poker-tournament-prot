var lobbyPage = function (){

    var EC = protractor.ExpectedConditions;

    // Add club functions

    this.waitForLobby = function () {
        browser.wait(EC.presenceOf(this.getCreateClubInput()), 10000, 'Lobby failed to load');
    };

    this.getCreateClubInput = function(){
        return element(by.model('clubName'));
    };

};

module.exports = new lobbyPage();
