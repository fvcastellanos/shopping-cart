import { Injectable } from '@angular/core';
import { Product } from "../model/product";

@Injectable()
export class ProductService {

  private _db: IDBDatabase;

  constructor() {
  }

  loadProducts() {
    let promise = new Promise((resolve, reject) => {
      this.initDatabase().then((value) => {
        this._db = value;
        resolve();
      }, (error) => {
        console.log("error initializing database: ", error);
        reject();
      });
    });

    return promise;
  }  

  getProducts() : Promise<Product[]> {
    let products : Product [] = new Array();
    let database : IDBDatabase = this._db;
    let promise = new Promise<Product[]>((resolve, reject) => {
      let objectStore = database.transaction("product").objectStore("product");
      let request = objectStore.openCursor();

      request.onsuccess = function(event: any) {
        database.close();
        let result = event.target.result;
        if (result) {
          products.push(result.value);
          result.continue();
        }

        resolve(products);
      }

      request.onerror = function(e) {
        reject(e);
      }

    });

    return promise;
  }

  public deleteDatabase() {
    // let database: any = this._db;

    let promise = new Promise((resolve, reject) => {

      let request = indexedDB.deleteDatabase("shopping-db");

      request.onerror = function(e) {
        reject(e);
      };

      request.onsuccess = function(e) {
        resolve(e);
      };
    });

    return promise;
  }

  private initDatabase() : Promise<IDBDatabase> {

    let userData : Product[] = this.createUserData();
    let promise = new Promise<IDBDatabase>((resolve, reject) => {
      let request = indexedDB.open("shopping-db", 1);

      request.onerror = function(e) {
        reject(e);
      };
      
      request.onsuccess = function(e) {
        resolve(request.result);
      };
      
      request.onupgradeneeded = function(e: any) {
        console.log("creating products repository");

        let objectStore: IDBObjectStore = e.target.result.createObjectStore("product", { keyPath: "id" });
          userData.forEach((product) => {
            objectStore.add(product);
          });
      };
    });

    return promise;
  }
  
  private createUserData() : Product[] {
    let products: Product[] = [
      { id: 1, name: "Happy Advocado", description: "Organic advocado", price: 25.00, imagePath: "assets/images/products/happy-advocado.png" },
      { id: 2, name: "Happy Cookie", description: "Organic cookie", price: 5.00, imagePath: "assets/images/products/happy-cookie.png" },
      { id: 3, name: "Mad Volcano", description: "Angry volcano", price: 5.00, imagePath: "assets/images/products/happy-volcano.png" }
    ];

    console.log("filling products repository");

    return products;
  }
}
