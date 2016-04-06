'use strict';

const path = require('path');
const wd = require('wd');

describe('macaca mobile sample', function() {
  this.timeout(5 * 60 * 1000);

  var driver = wd.promiseChainRemote({
    host: 'localhost',
    port: process.env.MACACA_SERVER_PORT || 3456
  });

  before(function() {
    return driver.init({
      platformName: 'Android',
      app: path.join(__dirname, '..', 'app', `android-app-bootstrap.zip`)
    });
  });

  after(function() {
    return driver
      .sleep(1000)
      .quit();
  });

  it('#1 should login success', function() {
    return driver
      .waitForElementsByClassName('android.widget.EditText', {}, 120000)
      .then(function(els) {
        return els[0];
      })
      .sendKeys('12345678')
      .sleep(1000)
      .elementsByClassName('android.widget.EditText')
      .then(function(els) {
        return els[1];
      })
      .sendKeys('111111')
      .sleep(1000)
      .waitForElementByName('Login')
      .click()
      .sleep(1000);
  });

});
