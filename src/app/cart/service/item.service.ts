import { Injectable } from '@angular/core';
import { Item } from "../model/item";
import { Product } from "../model/product";

@Injectable()
export class ItemService {

  private _items: Item [];

  constructor() { 
    this._items = new Array();
  }

  addItem(product: Product) {
    let item : Item = this.findProduct(product);
    if (item != null) {
      item.amount++;
    }
    else {
      item = new Item();
      item.amount = 1;
      item.product = product;
      this._items.push(item);
    }
  }

  removeItem(product: Product) {
    let item : Item = this.findProduct(product);

    if (item != null) {
      item.amount--;

      if (item.amount <= 0) {
        let list = this.removeItemsWithAmountZero();
        this._items = list;
      }
    }
  }

  updateQuantity(product: Product, quantity: number) {
    let item : Item = this.findProduct(product);

    if (item != null) {
      item.amount = quantity;

      if (item.amount <= 0) {
        let list = this.removeItemsWithAmountZero();
        this._items = list;
      }
    }
  }

  getTotal() : number {
    let total : number = 0;

    this._items.forEach((item) => {
      total = total + item.getTotal();;
    });

    return total;
  }

  getItems() : Item [] {
    return this._items;
  }

  findProduct(product: Product) : Item {
    return this._items.find((item) => {
      if (item.product.id === product.id) {
        return true;
      }

      return false;
    });
  }

  clearItems() {
    this._items = new Array();
  }

  private removeItemsWithAmountZero() : Item [] {
    console.log('removing items from cart');

    return this._items.filter((item) => {
          if (item.amount > 0) {
            return true;
          }

          return false;
        });
  }
}
