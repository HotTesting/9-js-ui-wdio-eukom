'use strict'

import * as assert from 'assert';
//const assert = require('assert');

describe('User', function () {
    it('can register', function () {
        browser.url(`/create_account`);
        const registrationForm = $('#box-create-account');
        registrationForm.$('input[name="firstname"]').setValue('John');
        registrationForm.$('input[name="lastname"]').setValue('Snow');

        const countrySelect = registrationForm.$('select[name="country_code"]');
        countrySelect.selectByVisibleText('Ukraine');

        const email = `test${new Date().getTime() / 1000}@grr.la`;
        registrationForm.$('input[name="email"]').setValue(email);
        registrationForm.$('input[name="phone"]').setValue('+1234567890');
        registrationForm.$('input[name="password"]').setValue(email);
        registrationForm.$('input[name="confirmed_password"]').setValue(email);
        registrationForm.$('button[name="create_account"]').click();

        browser.pause(2000);
        const alert = $('#notices .alert-success');

        assert(alert.isDisplayed(), `Expected success alert to be visible after registration`);
        
        const alertText = alert.getText();
        const expectedText = 'Your customer account has been created.'; 
        assert(alertText.includes(expectedText),
            `Alert text: "${alertText}" to match expected: "${expectedText}", after successfull registration`);
        
    })
})