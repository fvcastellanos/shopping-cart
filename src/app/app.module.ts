import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './index/index.component';
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app.routes";
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartService } from "./cart/service/cart.service";
import { ItemService } from "./cart/service/item.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductService } from "./cart/service/product.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    IndexComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    CartService,
    ItemService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
