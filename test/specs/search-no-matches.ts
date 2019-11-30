'use strict'

import * as assert from 'assert';

describe('Items search', function() {
    it(`should redirect to 'no matching results' in case no items matched`, function() {
        browser.url(`/`);
        const searchItem = new Date().getTime() / 1000;
        $('[type=search]').setValue(searchItem);
        browser.keys('Enter');

        const searchResultsSection = $('#box-search-results');
        assert(searchResultsSection.isDisplayed(), `Search results section cannot be found`);

        const emptySearchResultsMessage = 'No matching results';
        const emptySearchResults = searchResultsSection.$(`em*=${emptySearchResultsMessage}`);
        assert(emptySearchResults.isDisplayed(), `Search results section doesn't contain message "${emptySearchResultsMessage}"`);
        
        browser.pause(2000);
    })
})