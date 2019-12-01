'use strict'

import * as assert from 'assert';

describe('Search results sorting', function() {
    it('correctly arranges items when using "by name" sorting', function() {
        browser.url('/');
        const searchItem = 'Duck';
        $('[type=search]').setValue(searchItem);
        browser.keys('Enter');

        const searchResultsSection = $('#box-search-results');
        assert(searchResultsSection.isDisplayed(), `Search results section cannot be found`);

        searchResultsSection.$('a[href*="name"]').click();

        const foundProducts = searchResultsSection.$$('div.products div.column');
        const productNames = [];
        foundProducts.forEach(product => productNames.push(String(product.getAttribute('data-name').toLowerCase())));

        console.log('*******');
        console.log(productNames);

        let isSorted = false;
        for (let i=0; i<productNames.length-1; i++){
            isSorted = (productNames[i]<=productNames[i+1]) ? true : false;
            if (!isSorted) break;
        }

        assert(isSorted, 'Prodcuts list is not properly sorted by name');

        browser.pause(2000);
    });
})