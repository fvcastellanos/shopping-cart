import { Component, OnInit } from '@angular/core';
import { ItemService } from "../cart/service/item.service";
import { Item } from "../cart/model/item";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from "../cart/model/product";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public items: Item[];
  public total: number;

  public checkoutForm: FormGroup;

  constructor(private _itemService: ItemService,
              private _formBuilder: FormBuilder) {
   }

  ngOnInit() {
    this.items = this._itemService.getItems();
    this.total = this._itemService.getTotal();
  }

  onQuantityChange(ev: any, product: Product) {
    let value : number = ev.target.value;
    this._itemService.updateQuantity(product, value);

    this.total = this._itemService.getTotal();
    this.items = this._itemService.getItems();
  }
}
