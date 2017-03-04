var page = require('./page.po.js');

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
    // ***************************************************

    this.getLoginEmailInput = function(){
        page.waitUntilElementVisable(element(by.model('appData.loginEmail')))
        return element(by.model('appData.loginEmail'));
    };

    this.getLoginPasswordInput = function(){
        return element(by.model('appData.loginPassword'));
    };

    this.getLoginButton = function(){
        return $('#btn_modal_login');
    };

    this.getSignUpEmailInput = function(){
        return element(by.model('appData.createEmail'));
    };

    this.getSignUpPasswordInput = function(){
        return element(by.model('appData.createPassword'));
    };

    this.getSignUpButton = function(){
        return $('#btn_modal_signup');
    };

    this.getCancelButton = function(){
        return $('[translate="CANCEL"]')
    };

};

module.exports = new loginPage();
