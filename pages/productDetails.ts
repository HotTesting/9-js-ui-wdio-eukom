import { BasePage } from "./base";

export class ProductDetailsPage extends BasePage {
    addToCart(){
        $('button[name="add_cart_product"]').click();
        browser.pause(2000);
    }
}

export const ProductDetails = new ProductDetailsPage();