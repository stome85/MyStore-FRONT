import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Category} from "../models/category";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:8000/categories/'

  constructor(private httpClient: HttpClient) { }


  getCategories():Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.url);
  }

  getCategoriesByProductId(id: Number): Observable<Category>{
    return this.httpClient.get<Category>(this.url+id+"/")
  }

  create(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(this.url, category)
  }

  search(name: string): Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.url+"search/"+name)
  }
}
