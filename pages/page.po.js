var Page = function (){

    var EC = protractor.ExpectedConditions;

    this.getRandomString = function() {
        return (Math.random() + 1).toString(36).substring(7);
    };

    this.getRandomAlphabeticString = function(length) {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    this.getRandomNumber = function() {
        return Math.floor((Math.random() * 100000) + 1);
    }

    this.switchToNewWindow = function(){
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1]); // 0 or 1 to switch between the 2 open windows
        });
    };

    this.getDismissAlert = function(){
        return $('.alert-window #btn_clear_alerts');
    };

    this.getDismissAlertClickable = function(){
        var al = this.getDismissAlert();
        this.waitUntilElementVisable(al);
        return al;
    };

    this.getNthAlert = function(nth){
        return $$('.alert-warning').get(nth)
    };

    // waiters
    // **************************
    
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

    this.waitForModalNotPresent = function () {
        browser.wait(EC.not(EC.presenceOf($('.modal-dialog')), 5000, 'Modal still displays'));
    };

    this.waitForModalPresent = function () {
        browser.wait(EC.presenceOf($('.modal-dialog')), 5000, 'Modal did not load');
    };

    // wait until
    // **************************

    this.waitUntilElementClickable = function(element){
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(element), 5000);
    };

    this.waitUntilElementVisable = function(element){
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(element), 5000);
    };

    this.waitUntilElementInvisable = function(element){
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.invisibilityOf(element), 5000);
    };

    // launch
    // **************************

    this.getLaunchButton = function () {
        return $('#launchBtn');
    };

    // fb booklet
    // **************************
    
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
    // **************************
    
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

    // Profile Po

    this.selectLanguageDe = function () {
        element(by.model('profData.selLang')).click()
        element(by.cssContainingText('option', 'Deutsch')).click();
    };

    this.selectLanguageEn = function () {
        element(by.model('profData.selLang')).click()
        element(by.cssContainingText('option', 'English')).click();
    };

    this.getBtnBack = function () {
        return $('#btn_prof_back');
    };


};

module.exports = new Page();