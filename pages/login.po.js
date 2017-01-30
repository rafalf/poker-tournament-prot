var loginPage = function (){

    var EC = protractor.ExpectedConditions;

    // non angular login
    this.waitForPage = function () {
        browser.wait(EC.presenceOf(this.getComputerNameInput()), 5000, 'Element taking too long to appear');
    };

    this.getLoginEmailButton = function(){
        return $('#emailBtn');
    };

};

module.exports = new loginPage();
