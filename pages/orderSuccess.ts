export class OrderSuccessPage {
    
    private get container() { return $('#box-order-success') };

    confirmationPageShown() {
        return (this.container.isDisplayed());
    }

    confirmationTitleShown() {
        const confirmationTitle = this.container.$('h1').getText();
        return (confirmationTitle.includes('Your order') && confirmationTitle.includes('successfully completed'));
    }
} 

export const OrderSuccess = new OrderSuccessPage;