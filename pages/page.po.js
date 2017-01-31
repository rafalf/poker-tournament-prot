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

    this.waitForWelcomeHeading = function () {
        browser.wait(EC.presenceOf($('#welcomeHdr')), 10000, 'Welcome header failed to load');
    };

    this.waitForLaunchWindow = function () {
        browser.wait(EC.presenceOf($('#launchBtn')), 10000, 'Welcome header failed to load');
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


    // google login
    this.waitForGoogle = function () {
        browser.wait(EC.presenceOf(this.getGoogleEmailInput()), 10000, 'Google login failed to load');
    };

    this.waitForPassInput = function () {
        browser.wait(EC.visibilityOf(this.getGooglePasswordInput()), 10000, 'Google password failed to appear');
    };

    this.getGoogleEmailInput = function () {
        return $('#Email');
    };

    this.getGooglePasswordInput = function () {
        return $('#Passwd');
    };

    this.getGoogleNextButton = function () {
        return $('#next');
    };

    this.getGoogleSignInButton = function () {
        return $('#signIn');
    };

};

module.exports = new Page();