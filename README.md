### Install protractor [1](http://www.protractortest.org/#/)
* ```npm install -g protractor```
* ```webdriver-manager update```

### Install reporting:
(local installation - it'll create /node_modules)
From the root project dir:
* ```cd \confs```
* ```npm i protractor-jasmine2-html-reporter``` [html reporter](https://www.npmjs.com/package/protractor-jasmine2-html-reporter)
* ```npm install jasmine-spec-reporter --save-dev``` [spec reporter](https://www.npmjs.com/package/jasmine-spec-reporter)
<br>
__Note:__ If you encounter package.json error, you'll need to create a package.json in the confs dir
```npm init -Y```
<br>
Type in description and other required entries. an example of json file - package.json.example



### Run:
* drop ```test.json``` into confs dir
* run ```cmd``` and start webdriver: ```webdriver-manager start``` and leave the server running
* again run ```cmd``` --> ```cd ./confs/```
* run ```protractor conf.js --suite=regression```  - regression tests (all tests)
* run ```protractor conf.js --suite=smoke```       - smoke tests
* run ```protractor conf.js --suite=dev```         - a test being developed

### Prep & tear down:
To tear down all test data, we  need to run ```teardown.js```. It deletes all tournaments ( and in future will take care of
any data left behind created by test.blindvalet user).

* run ```cmd``` and start webdriver: ```webdriver-manager start``` and leave the server running
* again run ```cmd``` --> ```cd ./confs/```
* run ```protractor conf.js --suite=teardown```

### Results:
After tests are executed and completed, the suite generates a html report.
If there are any failures, the page screenshots are saved.


