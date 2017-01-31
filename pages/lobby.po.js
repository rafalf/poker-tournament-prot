var lobbyPage = function (){

    var EC = protractor.ExpectedConditions;

    // Add club functions

    this.waitForCreateClub = function () {
        browser.wait(EC.presenceOf(this.getEnterClubNameInput()), 10000, 'Lobby failed to load');
    };

    this.getEnterClubNameInput = function(){
        return element(by.model('clubName'));
    };

    this.getEnterClubPassword = function(){
        return element(by.model('clubPass'));
    };

    this.getCreateClubButton = function(){
        return element(by.cssContainingText('.btn', 'Create Club'));
    };

    this.getWelcomeHeading = function(){
        var title = $('#welcomeHdr');
        title.getText().then(function(t){
            console.log("Text: " + t)
        });
        return title.getText();
    };

    this.getGetLogoutButton = function(){
        return element(by.css('.lobby-left-bottom'));
    };
};

module.exports = new lobbyPage();
