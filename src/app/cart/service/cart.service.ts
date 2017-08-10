import { Injectable } from '@angular/core';
import { Product } from "../model/product";
import { ItemService } from "./item.service";
import { ProductService } from "./product.service";

@Injectable()
export class CartService {

  private _products: Product [];

  constructor(private _itemService: ItemService,
              private _productService: ProductService) { 
    // this._products = CartService.initDatabase();
    this.initDataStore();
  }

  getAllProducts() : Product [] {
    return this._products;
  }

  addItemToCart(id: number) {
    let product : Product = this.getProductById(id);
    console.log("product: " + product.name);
    this._itemService.addItem(product);
  }

  deleteAllProducts() {
    let promise = new Promise((resolve, reject) => {
      this._productService.deleteDatabase().then((value) => {
          console.log("database deleted");
          this._products = new Array();
          resolve();
        }, (error) => 
        {
          console.log(error);
          reject();
        });
        
      });

    return promise;
  }

  initDataStore() {
    this._productService.loadProducts().then(
      () => { this.loadProducts(); },
      (error) => { console.log(error); }
    );
  }
  
  private getProductById(_id: number) : Product {
    let item : Product = 
      this._products.find((product: Product) => {
        if (product.id === _id) {
          return true;
        }

        return false;
      });

    return item;
  }

  private loadProducts() {
    this._products = new Array();

    this._productService.getProducts().then((value) => {
      this._products = value;
    }, (error) => {
      console.log("unable to get products: ", error);
    });
  }

  private static initDatabase() : Product [] {
    console.log("adding products");
    let products: Product [] = new Array(3);

    products[0] = { id: 1, name: "Happy Advocado", description: "Organic advocado", price: 25.00, imagePath: "assets/images/products/happy-advocado.png" };
    products[1] = { id: 2, name: "Happy Cookie", description: "Organic cookie", price: 5.00, imagePath: "assets/images/products/happy-cookie.png" };
    products[2] = { id: 3, name: "Mad Volcano", description: "Angry volcano", price: 5.00, imagePath: "assets/images/products/happy-volcano.png" };

    return products;
  }
  
}
