var loginPage = function (){

    var EC = protractor.ExpectedConditions;

    this.getLoginEmailButton = function(){
        return $('#emailBtn');
    };

    this.getConnectFbButton = function(){
        return $('#btn_connect_facebook')
    };

    this.getConnectGoogleButton = function(){
        return $('#btn_connect_google')
    };

    this.getConnectEmailButton = function(){
        return $('#emailBtn')
    };

    // Connect with modal functions

    this.getLoginEmailInput = function(){
        return element(by.model('appData.loginEmail'));
    };

    this.getLoginPasswordInput = function(){
        return element(by.model('appData.loginPassword'));
    };

    this.getLoginButton = function(){
        return element(by.cssContainingText('.btn', 'Login'));
    };

    this.getSignUpEmailInput = function(){
        return element(by.model('appData.createEmail'));
    };

    this.getSignUpPasswordInput = function(){
        return element(by.model('appData.createPassword'));
    };

    this.getSignUpButton = function(){
        return element(by.cssContainingText('.btn', 'Sign up'));
    };

    this.getCancelButton = function(){
        return element(by.cssContainingText('.btn', 'Cancel'));
    };

};

module.exports = new loginPage();
