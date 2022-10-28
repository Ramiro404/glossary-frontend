import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  id:string|null = "";
  btnTypeForm = "";
  typeForm: 'update' | 'create' = 'create';
  errorMsg = "";
  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(35)]]
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.typeForm = 'update';
          this.btnTypeForm = 'Update category'
          this.categoryService.findOne(this.id).subscribe(
            (data)=>{
              this.form.patchValue({name: data.name});
            },(err:HttpErrorResponse)=>{
              this.errorMsg=err.message;
            }
          );
        } else {
          this.btnTypeForm = 'Add category'
          this.typeForm = 'create';
        }
      }
    )
  }

  onSubmit(): void {
    if (this.typeForm === 'create') {
      this.createSubmit();
    } else {
      this.updateSubmit();
    }


  }

  createSubmit(): void {
    const userId = this.tokenService.getUserId();
    if (this.form.valid && userId) {
      const category: Partial<Category> = this.form.getRawValue();
      category.userId = userId;
      this.categoryService.save(category).subscribe(
        (data) => {
          this.router.navigate(['../', 'category']);
        },
        (err: HttpErrorResponse) => {
          this.errorMsg = err.message;
        }
      )

    } else {
      this.form.markAllAsTouched();
    }
  }

  updateSubmit(): void {
    if (this.form.valid) {
      const category: Partial<Category> = this.form.getRawValue();
      this.categoryService.update(this.id||"0",category).subscribe(
        (data) => {
          this.router.navigate(['../', 'category']);
        },
        (err: HttpErrorResponse) => {
          this.errorMsg = err.message;
        }
      )

    } else {
      this.form.markAllAsTouched();
    }
  }

}
