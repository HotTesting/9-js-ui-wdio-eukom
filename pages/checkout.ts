import { BasePage } from "./base";

export class CheckoutPage extends BasePage {
    url = '/checkout';

    shoppingCart

    constructor() {
        super();
        this.shoppingCart = new ShoppingCart();
    }

    private get noItemsLabel() { return $('.cart.wrapper em') };

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
        return !this.isNoItemsInCart()
    }
}

class ShoppingCart {

}

export const Checkout = new CheckoutPage;

