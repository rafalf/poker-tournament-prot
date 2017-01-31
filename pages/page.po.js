var Page = function (){

    var EC = protractor.ExpectedConditions;

    this.getRandomString = function() {
        return Math.random().toString(36).slice(2);
    }


    this.switchToNewWindow = function(){
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1]); // 0 or 1 to switch between the 2 open windows
        });
    };

    this.switchToMainWindow = function(){
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[0]); // 0 or 1 to switch between the 2 open windows
        });
    };

    // fb booklet
    this.waitForFbBooklet = function () {
        browser.wait(EC.presenceOf(this.getFbLoginInput()), 10000, 'Fb booklet failed to load');
    };

    this.getFbLoginInput = function () {
        return $('#email');
    };

    this.getFbPasswordInput = function () {
        return $('#pass');
    };

    this.getFbLoginButton = function () {
        return $('[name="login"]');
    };

};

module.exports = new Page();