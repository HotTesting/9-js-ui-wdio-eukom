import { BasePage } from './base';
import { ProductDetailsModel } from '../models/productDetailsModel';

export class CheckoutPage extends BasePage {
    url = '/checkout';
    shoppingCart: ShoppingCart = new ShoppingCart();

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

    getProductInCartDetails(): ProductDetailsModel {
        const productInCartDetails = new ProductDetailsModel();

        productInCartDetails.name = this.getProductName();
        productInCartDetails.price = this.getProductPrice();

        return productInCartDetails;
    }
}

export const Checkout = new CheckoutPage;

