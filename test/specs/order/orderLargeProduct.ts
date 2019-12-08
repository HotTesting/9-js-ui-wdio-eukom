import { App } from '../../../pages/application';
import { expect } from 'chai';

describe('Order', function() {
    it('is successful for items with parameters', function() {
        App.product.openParametrizedProduct();
        expect(App.product.sizeSelectorShown()).to.be.true;
        const productDetails = App.product.getProductDetails();

        const productSize = 'Large'
        App.product.selectProductSize(productSize);
        const priceAdjust = App.product.getPriceAdjust($('.buy_now .select-wrapper .form-control [value=Large]'));
        productDetails.price += priceAdjust;
        
        App.product.addToCart();
        App.checkout.open();
        expect(App.checkout.shoppingCart.items.length).to.equal(1);
        
        const productInCartDetails = App.checkout.shoppingCart.items[0].getProductInCartDetails();
        expect(productInCartDetails.toString()).to.be.equal(productDetails.toString());

        App.checkout.customerDetailsForm.populateMandatotyFields();
        browser.pause(1000);
        App.checkout.confirmOrder();

        expect(App.orderSuccess.confirmationPageShown()).to.be.true;
        expect(App.orderSuccess.confirmationTitleShown()).to.be.true;
    })
})