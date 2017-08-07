import { Component, OnInit } from '@angular/core';
import { CartService } from "./service/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _cartService: CartService) { }

  ngOnInit() {
  }

  allowDrop(ev: DragEvent) {
    ev.preventDefault();
    console.log("drop allowed");
  }

  drag(ev: DragEvent) {
    //ev.dataTransfer.setData("info", "data...");
    console.log("drag started...");

  }

  drop(ev: DragEvent) {
    ev.preventDefault();
    console.log("drop completed");
  }
}
