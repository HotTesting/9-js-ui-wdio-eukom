import { App } from '../../../pages/application';
import { expect } from 'chai';

describe('Order', function(){
    it('is successful for 2 different items', function(){
        const productDetails = [];
        const productInCartDetails = [];

        App.product.openRegularProduct();
        productDetails.push(App.product.getProductDetails());
        App.product.addToCart();

        App.product.openDiscountedProduct();
        productDetails.push(App.product.getProductDetails());
        App.product.addToCart();

        App.checkout.open();
        expect(App.checkout.shoppingCart.items.length).to.equal(2);
        
        productInCartDetails.push(App.checkout.shoppingCart.items[0].getProductInCartDetails());
        productInCartDetails.push(App.checkout.shoppingCart.items[1].getProductInCartDetails());

        expect(productInCartDetails[0].toString()).to.be.equal(productDetails[0].toString());
        expect(productInCartDetails[1].toString()).to.be.equal(productDetails[1].toString());

        App.checkout.customerDetailsForm.populateMandatotyFields();
        App.checkout.confirmOrder();

        expect(App.orderSuccess.confirmationPageShown()).to.be.true;
        expect(App.orderSuccess.confirmationTitleShown()).to.be.true;
    })
})