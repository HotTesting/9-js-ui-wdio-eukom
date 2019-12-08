import { App } from '../../../pages/application';
import { expect } from 'chai';

describe('Order', function(){
    it('is successfull for regular product', function(){
        App.product.open(App.product.productCatalog.regularProduct);
        const productDetails = App.product.getProductDetails();
        
        App.product.addToCart();
        App.checkout.open();
        browser.pause(1000);
        expect(App.checkout.shoppingCart.items.length).to.equal(1);

        App.checkout.customerDetailsForm.populateMandatotyFields();
        browser.pause(1000);
        App.checkout.confirmOrder();

        expect(App.orderSuccess.confirmationPageShown()).to.be.true;
        expect(App.orderSuccess.confirmationTitleShown()).to.be.true;
    })
})
