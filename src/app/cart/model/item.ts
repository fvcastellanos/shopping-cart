
import { Product } from "./product";

export class Item {
    product: Product;
    amount: number;

    getTotal() {
        return this.amount * this.product.price;
    }
}