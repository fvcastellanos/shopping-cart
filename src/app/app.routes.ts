import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";

export const ROUTES: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', component: IndexComponent }
];
