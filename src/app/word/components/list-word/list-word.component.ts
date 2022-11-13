import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Word } from 'src/app/models/Word.model';
import { ModalService } from 'src/app/services/modal.service';
import { TokenService } from 'src/app/services/token.service';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-list-word',
  templateUrl: './list-word.component.html',
  styleUrls: ['./list-word.component.scss']
})
export class ListWordComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef})
  entry!: ViewContainerRef;
  sub!: Subscription;
  words:Word[] = [];
  colors:string[] = [
    "#ff7eb9",
    "#7afcff",
    "#feff9c",
    "#90ee90"
  ];
  categoryId="";
  errorMsg = "";
  constructor(
    private wordService:WordService,
    private tokenService:TokenService,
    private route:ActivatedRoute,
    private modalService:ModalService
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
          let firstColumnIndex = 1;
          for (let index = 0; index < this.words.length; index++) {
            const element = this.words[index];
            console.log(firstColumnIndex, "first index ", index," index")
            if(firstColumnIndex == (index+1)){
              element.color = this.colors[0];
              firstColumnIndex += 4;
            }
            else if( (index + 1) % 4 === 0) element.color = this.colors[1];
            else if( (index + 1) % 2 === 0) element.color = this.colors[3];
            else element.color = this.colors[2];

          }
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

  makeSound(): void {
    const audio = document.querySelector('#audio') as HTMLAudioElement;
    audio.play();
  }

  openModalDelete(word:Word) {
    this.sub = this.modalService
      .openModal(this.entry, `Are you sure you want to delete '${word.word}'?`, 'Click confirm or close to cancel')
      .subscribe((v) => {
        if(v === 'confirm')
          this.onDelete(word.id);
      });
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }
}
