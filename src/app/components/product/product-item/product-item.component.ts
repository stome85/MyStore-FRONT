import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  product: Product = {
    id: 0,
    name: '',
    category: 0,
    description: '',
    price: 0,
    amount: 0,
    image: ''
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log(id)
    if (id) {
      this.productService.getProductFromId(id).subscribe(product => {
        this.product = product
        console.log(product)
      });
    }
  }

  createProduct(): void {
    this.productService.createProduct(this.product).subscribe(() => {
      //mensagem: produto criado
      this.router.navigate(['/products'])
    })
  }

  // editProduct(id: number){
  //   this.productService.getProductFromId(id).subscribe((product)=>{
  //     this.product = product
  //   })
  // }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
