import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

const routes: Routes = [
  {path: '', component: CategoryPageComponent,
    children: [
      {path: '', component: ListCategoryComponent},
      {path: 'new-category', component: CategoryFormComponent},
      {path: 'update-category/:id', component: CategoryFormComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
