import { CartService } from '../../../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  products: any;


  ngOnInit(): void {

    let id =  this.route.snapshot.paramMap.get(('id'))
    if(id) {
      this.productService.getProductsByCategory(id).subscribe((products) => {
        this.products = products
      })
    }
  }

  getProducts() {
    return this.products;
  }

  newProductPage(): void {
    console.log("navigate...")
    this.router.navigate(['/products/item'])
  }

  goToEditPage(id: number): void {
    this.router.navigate(['/products/'+id])
  }

  newCategoryPage(): void {
    console.log("navigate...")
    this.router.navigate(['/listCategories/item'])
  }
}
