import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'products', component: ProductComponent },
  { path: 'boards', component: ProductListComponent},
  { path: 'sensors', component: ProductListComponent},
  { path: 'cart', component: CartComponent },
  { path: 'category/:type', component: ProductListComponent },
  { path: 'products/:id', component: ProductComponent },
  // { path: 'products', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'} )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
