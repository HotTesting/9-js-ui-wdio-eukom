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

    openDiscountedProduct(){
        super.open(this.productCatalog.discountedProduct);
    }

    openRegularProduct(){
        super.open(this.productCatalog.regularProduct);
    }

    productCatalog = {
        regularProduct: '/rubber-ducks-c-1/red-duck-p-3',
        discountedProduct: '/rubber-ducks-c-1/blue-duck-p-4',
    };

    saleAttributesShown(){
        return ( $('* #box-product .sale').isDisplayed() && $('* #box-product .campaign-price').isDisplayed());
    }
}

export const ProductDetails = new ProductDetailsPage();