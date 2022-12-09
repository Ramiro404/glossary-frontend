import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Word } from 'src/app/models/Word.model';
import { TokenService } from 'src/app/services/token.service';
import { WordService } from 'src/app/services/word.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent implements OnInit {
  form: FormGroup;
  id: string | null = null;
  userId:string | null = null;
  categoryId!: string;
  btnTypeForm:string = "";
  errMsg = "";
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
  constructor(
    private fb: FormBuilder,
    private wordService: WordService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService:TokenService
  ) {
    this.form = this.fb.group({
      word: ['', [Validators.required]],
      description: ['', Validators.required]
    });
    this.userId = this.tokenService.getUserId();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const categoryId = params.get('category');
        const id = params.get('word');
        if (categoryId) {
          this.categoryId = categoryId;
        }
        if (id) {
          this.btnTypeForm="Update word"
          this.id = id;
          this.wordService.findOne(this.id).subscribe(
            (data) => {
              this.form.patchValue({
                word: data.word,
                description: data.description
              });
            },
            (err: HttpErrorResponse) => {
              this.errMsg = err.message
            }
          )
        }else{
          this.btnTypeForm="Add word"
        }
      }
    )
  }

  onSubmit(): void {
    if (this.form.valid) {
      const word: Partial<Word> = this.form.getRawValue();
      if (this.id) {
        this.onUpdate(word);
      }else{
        this.onCreate(word);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCreate(word:Partial<Word>): void {
    word.categoryId = this.categoryId
    this.wordService.create(word).subscribe(
      (data) => {
        this.router.navigate(['word/', this.categoryId]);
      },
      (err: HttpErrorResponse) => {
        this.errMsg = err.message;
      }
    )
  }

  onUpdate(word:Partial<Word>): void {
    this.wordService.update(this.id||"0",word).subscribe(
      (data) => {
        this.router.navigate(['word/', this.categoryId]);
      },
      (err: HttpErrorResponse) => {
        this.errMsg = err.message;
      }
    )
  }

  onBold(): void{
    let seletedText = "";
    seletedText = window.getSelection()?.toString() || "";
    let description = this.form.get('description')?.value as string;
    const newDesc = description.replace(seletedText, `<b>${seletedText}</b>`);
    this.form.patchValue({newDesc});
    //document.execCommand('bold');
    console.log(seletedText);
  }
  onItalics(): void {

  }
  onSubs(): void {

  }

}
