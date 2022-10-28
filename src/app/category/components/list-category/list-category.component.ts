import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  categories:Category[]=[];
  errorMsg="";
  constructor(
    private categoryService:CategoryService,
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    const id = this.tokenService.getUserId();
    if(id){
      this.categoryService.findAll(id).subscribe(
        (data)=>{
          this.categories=data;
        },
        (error:HttpErrorResponse)=>{
          this.errorMsg=error.message;
        }
      )
    }else{
      this.errorMsg="You are not authorized"
    }
    
  }

  onDelete(id:string):void{
    this.categoryService.delete(id).subscribe(
      (response)=>{
        this.loadData();
      },
      (err:HttpErrorResponse)=>{
        this.errorMsg=err.message;
      }
    )
  }



}
