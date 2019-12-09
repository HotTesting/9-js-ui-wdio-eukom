import { BasePage } from './base';
import { ProductDetailsModel } from '../models/productDetailsModel';
import { parse } from 'path';

export class CheckoutPage extends BasePage {
    url = '/checkout';
    shoppingCart: ShoppingCart = new ShoppingCart();
    customerDetailsForm: CustomerDetailsForm = new CustomerDetailsForm();

    private get noItemsLabel() { return $('.cart.wrapper em') };
    private get checkoutContainer() {return $('#box-checkout-cart')};

    open(){
        super.open(this.url);
    }

    isNoItemsInCart() {
        if(this.noItemsLabel.isDisplayed()) {
            return this.noItemsLabel.getText()
                .includes('There are no items in your cart.')
        } else {
            return false
        }
    }

    isItemsInCart() {
        return (this.checkoutContainer.isDisplayed());
    }

    confirmOrder() {
        $('[name=confirm_order]').click();
    }
}

class ShoppingCart {
    private get container(): WebdriverIO.Element {
        return $('#box-checkout-cart');
    }

    public get items(): Item[] {
        return this.container.$$('table.items tr.item').map(item => {
            return new Item(item);
        })
    }
}

class Item {
    container: WebdriverIO.Element;

    constructor(itemContainer :WebdriverIO.Element){
        this.container = itemContainer;
    }

    public getProductName(): string {
        return this.container.getAttribute('data-name');
    }
    
    public getProductPrice(): number {
        return parseFloat(this.container.getAttribute('data-price'));
    }

    public getProductQuantity(): number {
        return parseInt(this.container.$('[data-type=number]').getValue());
    }

    getProductInCartDetails(): ProductDetailsModel {
        const productInCartDetails = new ProductDetailsModel();

        productInCartDetails.name = this.getProductName();
        productInCartDetails.price = this.getProductPrice();
        productInCartDetails.quantity = this.getProductQuantity();

        return productInCartDetails;
    }
}

class CustomerDetailsForm {
    private get container(): WebdriverIO.Element { return $('#box-checkout #box-checkout-customer') }

    public get firstName(): WebdriverIO.Element { return this.container.$('[name=firstname]') }
    public get lastName(): WebdriverIO.Element { return this.container.$('[name=lastname]') }
    public get address1(): WebdriverIO.Element { return this.container.$('[name=address1]') }
    public get postcode(): WebdriverIO.Element { return this.container.$('[name=postcode]') }
    public get city(): WebdriverIO.Element { return this.container.$('[name=city]') }
    public get country_code(): WebdriverIO.Element { return this.container.$('[name=country_code]') }
    public get email(): WebdriverIO.Element { return this.container.$('[name=email]') }
    public get phone(): WebdriverIO.Element { return this.container.$('[name=phone]') }
    
    public populateMandatotyFields() {
        const timeStamp = Math.floor(new Date().getTime() / 1000);
        const email = `test${timeStamp}@grr.la`;
        
        this.firstName.setValue(timeStamp);
        this.lastName.setValue(timeStamp);
        this.address1.setValue(timeStamp);
        this.postcode.setValue(Math.floor(timeStamp/100000));
        this.city.setValue(timeStamp);
        this.email.setValue(email);
        this.phone.setValue(`+${timeStamp}`);
        this.country_code.selectByVisibleText('Turkey');
        
        this.container.$('[name=save_customer_details]').click();
        browser.pause(1000);
    }
}

export const Checkout = new CheckoutPage;

