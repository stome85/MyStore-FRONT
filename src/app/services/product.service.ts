import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsList: Product[] = [
    {
      id: 0,
      name: '',
      price: 0,
      description: '',
      category: 0,
      image: '',
      amount: 0,
    },
  ];

  //list of products where type == board
  boardList: any;
  //list of products where type == sensor
  sensorList: any;
  //ID received from Main page
  productId = '1';

  //used to inform wich type of product list will be opened in the product-list Page
  productType = '';

  url = 'http://localhost:8000/products/';

  constructor(private httpClient: HttpClient) {
    this.getProducts().subscribe((products) => {
      this.productsList = products;
    });
  }

  /* load products list from database */
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  createProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(this.url, product)
  }

  getProductsByCategory(id_category: string):Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url+"category/"+id_category)
  }

  //load the products from database filtered by category.
  getProductsByType(type: string): Observable<Product[]> {
    // return this.httpClient.get<Product[]>("http://localhost:8000/productType/"+type);
    return this.httpClient.get<Product[]>(this.url+"product/"+type);
  }

  //find an element by its id and returns it
  getProductFromId(id: any): Observable<Product> {
    return this.httpClient.get<Product>(this.url+id+"/");

  }

  /* filters the productList by the type */
  productListTypeFilter(type: number) {
    return this.productsList.filter((p) => p.category == type);
  }

  //return the products list
  getProductList() {
    return this.productsList;
  }

  //return the products that type == 'board'
  getBoardList() {
    return this.productListTypeFilter(1);
  }

  //return the products that type == 'sensor'
  getSensorList() {
    return this.productListTypeFilter(2);
  }
}
