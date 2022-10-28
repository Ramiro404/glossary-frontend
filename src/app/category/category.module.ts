import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListCategoryComponent,
    CategoryPageComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
