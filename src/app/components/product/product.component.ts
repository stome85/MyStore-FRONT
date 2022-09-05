import {CartService} from './../../services/cart.service';
import {CartComponent} from './../cart/cart.component';
import {ProductService} from './../../services/product.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from "../../models/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: any;
  products: any;
  productId: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //loads the product Id from the ProductService
    //this.productComponentProductId = this.productService.productId;
  }

  ngOnInit(): void {
    let id = this.getRouteId();
    console.log(id)
    if (id == null) {
      this.productService.getProducts().subscribe((products => {
        this.products = products
      }))
    }else{
      this.productService.getProductsByCategory(id).subscribe((products)=>{
        this.products = products

      })
    }
  }

  getRouteId(){
    return this.route.snapshot.paramMap.get(('id'))
  }

  getProducts() {
    return this.products;
  }

  goToPage(): void {
    console.log("navigate...")
    this.router.navigate(['/products/item'])
  }

  goToEditPage(id: number): void {
    this.router.navigate(['/products/' + id])
  }

  /* gets the type param from the url (route param) to set what products will be showed */
  // this.route.params.subscribe((params) => {
  //   this.productId = params['id'];
  // });
  //
  // this.productService.getProductFromId(this.productId).subscribe( (product) => {
  //   this.product = product
  // } )


  /* adds the selected produtc to the cartServices's list */
  addToCart(id: String) {
    this.productService.getProductFromId(id).subscribe((product) => {
      this.cartService.addToCart(product);
    });
  }

  splitPrice(price: any) {
    return price / 10;
  }
}
