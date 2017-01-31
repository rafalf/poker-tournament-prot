var Page = function (){

    var EC = protractor.ExpectedConditions;

    this.aaa = function(){
        return $('#');
    };


    this.switchToNewWindow = function(){
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo.window(handles[1]); // 0 or 1 to switch between the 2 open windows
        });
    };

};

module.exports = new Page();