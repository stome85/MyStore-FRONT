import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {

  }

  categoriesList: any;

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories)=>{
      this.categoriesList = categories
    })
  }

  openCartPage() {
    this.router.navigateByUrl('/cart');
  }

  setProductListType(productType: string) {
    this.productService.productType = productType;
  }

  getTotalCost() {
    return this.cartService.getTotalCost();
  }

}
