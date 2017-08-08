import { Component, OnInit } from '@angular/core';
import { CartService } from "./service/cart.service";
import { Product } from "./model/product";
import { ItemService } from "./service/item.service";
import { Item } from "./model/item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: Product [];
  public items: Item[];
  public total: number;

  constructor(private _cartService: CartService,
    private _itemService: ItemService) { 
    this.products = _cartService.getAllProducts();
    this.items = this._itemService.getItems();
    this.total = this._itemService.getTotal();
  }

  ngOnInit() {
  }

  allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }

  drag(ev: DragEvent, product: Product) {
    ev.dataTransfer.setData("text", product.id.toString());
    console.log("drag started...");
  }

  drop(ev: DragEvent) {
    ev.preventDefault();

    let id = ev.dataTransfer.getData("text")
    this._cartService.addItemToCart(Number.parseInt(id));
    this.total = this._itemService.getTotal();

    console.log("drop completed: " + this._itemService.getTotal().toString());
  }
}
