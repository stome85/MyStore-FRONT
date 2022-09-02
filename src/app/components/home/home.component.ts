import {CartService} from './../../services/cart.service';
import {ProductService} from './../../services/product.service';
import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {
  }

  productList: any;
  boardList: any;
  sensorList: any;

  ngOnInit(): void {
    //load all products from database
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    })
    /* load the boards from database */
    this.productService.getProductsByCategory("1").subscribe((products) => {
      this.boardList = products;
    })

    // /* load the sensors from database */
    this.productService.getProductsByCategory("2").subscribe((products) => {
      this.sensorList = products;
    })

  }

  /* adds the selected produtc to the cartServices's list */
  addToCart(id: String) {
    this.productService.getProductFromId(id).subscribe((product) => {
      this.cartService.addToCart(product);
    });
  }

  getBoardList() {
    return this.boardList;
  }

  getSensorList() {
    return this.sensorList;
  }

  getProductsList() {
    return this.productList;
  }

  /* split the productPrice atribute for credit card payment*/
  splitPrice(price: any) {
    return price / 10;
  }
}
