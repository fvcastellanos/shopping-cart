import { Component, OnInit } from '@angular/core';
import { ItemService } from "../cart/service/item.service";
import { Item } from "../cart/model/item";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public items: Item[];
  public readonly total: number;

  public checkoutForm: FormGroup;

  constructor(private _itemService: ItemService,
              private _formBuilder: FormBuilder) {
    this.items = this._itemService.getItems();
    this.total = this._itemService.getTotal();
   }

  ngOnInit() {
    // this.checkoutForm = this._formBuilder.group({
    //   id: [],
    //   values: []
    // });
  }

  onQuantityChange(inputId: number) {
    let value = document.getElementById(inputId.toString());

    console.log(value.innerHTML);
  }
}
