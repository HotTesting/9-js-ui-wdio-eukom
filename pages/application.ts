import { ProductDetails } from './productDetails';
import { Checkout } from './checkout';
import { OrderSuccess } from './orderSuccess';

class Application {
    product = ProductDetails;
    checkout = Checkout;
    orderSuccess = OrderSuccess; 
}

export const App: Application = new Application();