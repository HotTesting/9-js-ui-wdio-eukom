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

    public getProductQuantity(): number {
        return parseInt($('.buy_now [name=quantity]').getValue());
    }

    getProductDetails(): ProductDetailsModel {
        const productDetails = new ProductDetailsModel();

        productDetails.name = this.getProductName();
        productDetails.price = this.getProductPrice();
        productDetails.quantity = this.getProductQuantity();

        return productDetails;
    }

    openDiscountedProduct(){
        super.open(this.productCatalog.discountedProduct);
    }

    openRegularProduct(){
        super.open(this.productCatalog.regularProduct);
    }

    openParametrizedProduct(){
        super.open(this.productCatalog.parametrizedProduct);
    }

    private productCatalog = {
        regularProduct: '/rubber-ducks-c-1/red-duck-p-3',
        discountedProduct: '/rubber-ducks-c-1/blue-duck-p-4',
        parametrizedProduct: '/rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6'
    };

    saleAttributesShown(): boolean {
        return ($('* #box-product .sale').isDisplayed() && $('* #box-product .campaign-price').isDisplayed());
    }

    sizeSelectorShown(): boolean {
        return ($('.buy_now .select-wrapper').isDisplayed());
    }

    selectProductSize(productSize: string) {
        $('.buy_now .select-wrapper .form-control').selectByAttribute('value', productSize);
    }

    setProductQuantity(productQantity: number) {
        $('.buy_now [name=quantity]').setValue(productQantity);
    }

    getPriceAdjust(dropDownItem: WebdriverIO.Element): number {
        return parseFloat(dropDownItem.getAttribute('data-price-adjust'));
    }
}   

export const ProductDetails = new ProductDetailsPage();