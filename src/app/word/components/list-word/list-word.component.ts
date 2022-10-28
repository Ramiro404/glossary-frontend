import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Word } from 'src/app/models/Word.model';
import { TokenService } from 'src/app/services/token.service';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-list-word',
  templateUrl: './list-word.component.html',
  styleUrls: ['./list-word.component.scss']
})
export class ListWordComponent implements OnInit {
  words:Word[] = [];
  categoryId="";
  errorMsg = "";
  constructor(
    private wordService:WordService,
    private tokenService:TokenService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(
      (params)=>{
        const id = params.get('category')
        if(id){
          this.categoryId=id;
          this.loadData();
        }else{
          this.errorMsg="An error ocurred"
        }
      }
    )
  }

  loadData():void{
      this.wordService.findAll(this.categoryId).subscribe(
        (data)=>{
          console.log(data)
          this.words=data;
        },
        (error:HttpErrorResponse)=>{
          this.errorMsg = error.message;
        }
      )
    
  }

  onDelete(id:string):void{
    this.wordService.delete(id).subscribe(
      ()=>{
        this.loadData();
      },
      (err:HttpErrorResponse)=>{
        this.errorMsg=err.message
      }
    )
  }



}
