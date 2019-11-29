'use strict'

import * as assert from 'assert';

describe('Search results', function() {
    it('should be empty', function() {
        browser.url(`/`);
        const searchItem = new Date().getTime() / 1000;
        $('[type=search]').setValue(searchItem);
        browser.keys('Enter');

        const emptySearchSection = $('#box-search-results em');
        assert(emptySearchSection.isDisplayed(), `Search results area is not empty`);
        
        const emptySearchExpectedText = 'No matching results';
        const emptySearchActualText = emptySearchSection.getText();
        assert(emptySearchExpectedText === emptySearchActualText,
            `Message "${emptySearchActualText}" is shown rather than "${emptySearchExpectedText}"`);
            
        browser.pause(2000);
    })
})