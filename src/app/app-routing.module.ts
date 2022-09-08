import {ProductListComponent} from './components/product/product-list/product-list.component';
import {CartComponent} from './components/cart/cart.component';
import {ProductComponent} from './components/product/product.component';
import {ProductItemComponent} from "./components/product/product-item/product-item.component";
import {HomeComponent} from './components/home/home.component';
import {NgModule, Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryItemComponent} from "./components/category/categoryItem.component";

const productsRoutes=[
  {path:'prod', component: ProductComponent}
]
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductComponent},
  {path: 'products/:id', component: ProductItemComponent},
  {path: 'products/category/:id', component: ProductComponent},
  {path: 'products/item', component: ProductItemComponent},
  {path: 'listCategories/item', component: CategoryItemComponent},
  {path: 'cart', component: CartComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  // imports: [RouterModule.forChild(productsRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
