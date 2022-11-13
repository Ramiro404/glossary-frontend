import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Word } from 'src/app/models/Word.model';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss']
})
export class WordDetailComponent implements OnInit {
  word!:Word;
  errMsg = "";
  descriptionFormatted = "";
  constructor(
    private wordService:WordService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loadData();
  }

  loadData():void{
    this.route.paramMap.subscribe(
      (params)=>{
        const wordId = params.get('word')
        if(wordId){
          this.wordService.findOne(wordId).subscribe(
            (data)=>{
              this.word = data;
              const updateWord:Partial<Word> = { lastTimeStudied: new Date()};
              this.wordService.update(this.word.id, updateWord).subscribe(
                ()=>{}
              )
            },
            (err:HttpErrorResponse)=>{
              this.errMsg=err.message;
            }
          )
        }
      }
    )

  }

}
