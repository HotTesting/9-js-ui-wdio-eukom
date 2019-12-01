'use strict'

import * as assert from 'assert';

describe('Contact us form', function(){
    it('must send messages to shop administration', function(){
        browser.url('/')
        $('nav.navbar .customer-service').click();
        
        assert($('#box-customer-service').$(`h1=Contact Us`).isDisplayed(), 'Contact Us form is not shown');

        const email = `test${new Date().getTime() / 1000}@grr.la`;
        const contactUsForm = $('form[name=contact_form]');
        contactUsForm.$('[name=name]').setValue(email);
        contactUsForm.$('[name=email]').setValue(email);
        contactUsForm.$('[name=subject]').setValue(email);
        contactUsForm.$('[name=message]').setValue(email);
        contactUsForm.$('[type=submit]').click();

        const alertSuccesSection = $('.alert-success');
        assert(alertSuccesSection.isDisplayed(), '"Contact Us" submission confirmation is not shown');

        const messageExpected = 'Your email has successfully been sent';
        const messageActual = $('.alert-success').getText();
        assert(messageActual.includes(messageExpected),
            `Alert text: "${messageActual}" differs from expected alert: "${messageExpected}"`);

        browser.pause(2000);
    })
})