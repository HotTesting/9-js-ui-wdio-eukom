import { App } from '../../../pages/application';
import { expect } from 'chai';

describe('Order', function(){
    it('is successful for discounted item', function(){
        App.product.openDiscountedProduct();
        expect(App.product.saleAttributesShown()).to.be.true;
        const productDetails = App.product.getProductDetails();

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