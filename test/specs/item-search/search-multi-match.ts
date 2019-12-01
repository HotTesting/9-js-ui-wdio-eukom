'use strict'

import * as assert from 'assert';

describe('Item search', function(){
    it('should show results in case of multiple items matches', function(){
        browser.url('/');
        const searchItem = 'Duck';
        $('[type=search]').setValue(searchItem);
        browser.keys('Enter');

        const searchResultsSection = $('#box-search-results');
        assert(searchResultsSection.isDisplayed(), `Search results section cannot be found`);

        const foundProducts = searchResultsSection.$$('div.products > div');
        assert(foundProducts.length >= 2, `Search results section contains less than 2 items`);

        browser.pause(2000);
    })
})