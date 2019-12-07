import { ProductDetails } from './productDetails';
import { Checkout } from './checkout';

class Application {
    product = ProductDetails;
    checkout = Checkout; 
}

export const App: Application = new Application();