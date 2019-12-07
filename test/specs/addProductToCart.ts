import { App } from '../../pages/application';
import { expect } from 'chai'

describe('Cart', function () {
    it('can add item', function () {
        App.product.open('/rubber-ducks-c-1/red-duck-p-3');
        const productDetails = App.product.getProductDetails();

        App.product.addToCart();
        App.checkout.open();
        browser.pause(1000);
        expect(App.checkout.isItemsInCart()).to.be.true;

        expect(App.checkout.shoppingCart.items.length).to.equal(1);
        const productInCartDetails = App.checkout.shoppingCart.items[0].getProductInCartDetails();

        expect(productInCartDetails.toString()).to.equal(productDetails.toString());
    })
})