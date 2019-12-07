import { BasePage } from "./base";
import { ProductDetailsModel } from "../models/productDetailsModel";

export class ProductDetailsPage extends BasePage {
    addToCart(){
        $('button[name="add_cart_product"]').click();
        browser.pause(1000);
    }

    public getProductPrice(): number {
        return parseFloat($('#box-product').getAttribute('data-price'));
    }

    public getProductName(): string {
        return $('h1.title').getText();
    }

    getProductDetails(): ProductDetailsModel {
        const productDetails = new ProductDetailsModel();

        productDetails.name = this.getProductName();
        productDetails.price = this.getProductPrice();

        return productDetails;
    }
}

export const ProductDetails = new ProductDetailsPage();