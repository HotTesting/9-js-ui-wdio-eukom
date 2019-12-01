'use strict'

import * as assert from 'assert';

describe('Item search', function(){
    it('should redirect to item page in case only one result matches', function(){
        browser.url('/');
        const searchItem = 'RD005';
        $(`[type=search]`).setValue(searchItem);
        browser.keys('Enter');

        assert($('#box-product h1.title').isDisplayed(), 'Product title was not shown');

        browser.pause(2000);
    })
})