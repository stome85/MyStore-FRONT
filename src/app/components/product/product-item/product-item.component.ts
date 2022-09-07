import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  listCategories: any
  categoryGet: any

  category: Category = {
    id: 0,
    name: ''
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
    console.log(typeof(id))
    if (id == "item"){
      console.log("certo")
      this.categoryService.getCategories().subscribe((categories) => {
        this.listCategories = categories
      })
    }
    else {
      console.log("errado")
      this.productService.getProductFromId(id).subscribe(product => {
        this.product = product
        this.categoryService.getCategoriesByProductId(this.product.category).subscribe(category => {
          this.category = category
        })
      });
    }

  }


  createProduct(): void {
    this.product.category = this.categoryGet
    this.productService.create(this.product).subscribe(() => {
      this.router.navigate(['/products'])
    })
  }

  editProduct(id: Number) {
    this.productService.update(id, this.product).subscribe((product) => {
      //mensagem: produto atualizado
      this.router.navigate(['/products'])
    })
  }

  deleteProduct(id: Number) {
    this.productService.delete(id).subscribe(() => {
      //mensagem: produto apagado
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

  //Enable or disable CRUD buttons acoording to request
  configButtons() {
    const url = this.route.snapshot.url.toString()
    let x
    url == "products,item" ? x = true : x = false
    return x
  }

}
