### Install protractor [1](http://www.protractortest.org/#/)
* ```npm install -g protractor```
* ```webdriver-manager update```

### Install reporting:
(local installation -- commented out in the code for now so no need to install it yet)
* cd ./confs/ and npm install command from the link below:
[1 - html reporter](https://www.npmjs.com/package/protractor-jasmine2-html-reporter)

### Run:
* drop ```test.json``` into confs dir
* run ```cmd``` and start webdriver: ```webdriver-manager start``` and leave the server running
* again run ```cmd``` --> ```cd ./confs/```
* run ```protractor conf.js```


### Prep & tear down:
To tear down all test data, we  need to run ```teardown.js```. It deletes all tournaments ( and in future will take care of
any data left behind created by test.blindvalet user).

* run ```cmd``` and start webdriver: ```webdriver-manager start``` and leave the server running
* again run ```cmd``` --> ```cd ./confs/```
* run ```protractor teardown.js```

### Results:
After tests are executed and completed, the suite generates a html report.
If there are any failures, the page screenshots are saved.
(yet again commented out in the code for the moment)


