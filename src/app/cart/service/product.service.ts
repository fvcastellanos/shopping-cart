import { Injectable } from '@angular/core';
import { Product } from "../model/product";

@Injectable()
export class ProductService {

  private static db: any;

  constructor() {
    ProductService.initDatabase();
  }

  getProducts() : Product[] {
    let products : Product [] = new Array();
    // let objectStore: IDBObjectStore = ProductService.db.transaction("product").objectStore("product");
    // let request = objectStore.openCursor();

    // request.onsuccess = function(event: any) {
    //   ProductService.db.close();

    //   let result = event.target.result;
    //   if (result) {
    //     products.push(result.value);
    //   }
    // }

    // request.onerror = function(e) {
    //   console.log("error getting products: ", e);
    // }

    return products;
  }

  private static initDatabase() {
    let request = indexedDB.open("shopping-db", 1);
    
    request.onerror = function(e) {
      console.log("error: ", e);
    };
    
    request.onsuccess = function(e) {
      ProductService.db = request.result;
    };
    
    request.onupgradeneeded = function(e: any) {
      console.log("creating products repository");

      let objectStore: IDBObjectStore = e.target.result.createObjectStore("product", { keyPath: "id" });
      ProductService.createUserData().forEach((product) => {
        objectStore.add(product);
      });
    };
  }
  
  private static createUserData() : Product[] {
    let products: Product[] = [
      { id: 1, name: "Happy Advocado", description: "Organic advocado", price: 25.00, imagePath: "assets/images/products/happy-advocado.png" },
      { id: 2, name: "Happy Cookie", description: "Organic cookie", price: 5.00, imagePath: "assets/images/products/happy-cookie.png" },
      { id: 3, name: "Mad Volcano", description: "Angry volcano", price: 5.00, imagePath: "assets/images/products/happy-volcano.png" }
    ];

    console.log("filling products repository");

    return products;
  }
}
