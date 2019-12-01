'use strict'

import * as assert from 'assert';

describe('Search results sorting', function(){
    it('correctly arranges items when using "by price" sorting', function(){
        browser.url('/');
        const searchItem = 'Duck';
        $('[type=search]').setValue(searchItem);
        browser.keys('Enter');

        const searchResultsSection = $('#box-search-results');
        assert(searchResultsSection.isDisplayed(), `Search results section cannot be found`);

        searchResultsSection.$('a[href*="price"]').click();
        
        const foundProducts = searchResultsSection.$$('div.products div.column');
        const productPrices = [];
        foundProducts.forEach(product => productPrices.push(Number(product.getAttribute('data-price'))));

        let isSorted = false;
        for (let i=0; i<productPrices.length-1; i++){
            isSorted = (productPrices[i]<=productPrices[i+1]) ? true : false;
            if (!isSorted) break;
        }

        assert(isSorted, 'Prodcuts list is not properly sorted by price');

        browser.pause(2000);
    })
})