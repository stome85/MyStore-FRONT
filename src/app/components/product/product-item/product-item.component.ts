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
    if (id) {
      this.productService.getProductFromId(id).subscribe(product => {
        this.product = product
      });
    }
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      //mensagem: produto criado
      this.router.navigate(['/products'])
    })
  }

  editProduct(id: Number){
    this.productService.update(id, this.product).subscribe((product)=>{
      //mensagem: produto atualizado
      this.router.navigate(['/products'])
    })
  }

  deleteProduct(id: Number){
    this.productService.delete(id).subscribe(()=>{
      //mensagem: produto apagado
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

  //Enable or disable CRUD buttons acoording to request
  configButtons(){
    const url = this.route.snapshot.url.toString()
    let x
    url=="products,item" ? x = true : x = false
    return x
  }

}
