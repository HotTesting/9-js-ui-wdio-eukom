import { ProductDetails } from '../../../pages/productDetails';
import { Checkout } from '../../../pages/checkout';
import { expect } from 'chai'

describe('Cart', function () {
    it('can add item', function () {
        ProductDetails.open('/rubber-ducks-c-1/red-duck-p-3');
        ProductDetails.addToCart();
        Checkout.open();
        browser.pause(2000);
        expect(Checkout.isItemsInCart()).to.be.true;
    })
})