import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {Category} from "../../models/category";

@Component({
  selector: 'app-category',
  templateUrl: './categoryItem.component.html',
  styleUrls: ['./categoryItem.component.scss']
})
export class CategoryItemComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private router: Router,
  ) {
  }

  category: Category = {
    id: 0,
    name: ''
  }
  searchName: string = '';

  ngOnInit(): void {
  }

  createCategory() {
    this.categoryService.create(this.category).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

  searchCategory() {
    this.categoryService.search(this.searchName).subscribe((category => {
    this.category.name = category[0].name
    }))
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
