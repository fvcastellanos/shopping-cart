import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  private _db;
  constructor() { 
    // this._db = openDatabase('shopping-cart', '1.0', 'Shopping cart database', 2 * 1024 * 1024);
  }

  initDatabase() {

  }

}
