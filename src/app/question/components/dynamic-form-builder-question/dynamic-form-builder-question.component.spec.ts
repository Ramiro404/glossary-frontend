import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormBuilderQuestionComponent } from './dynamic-form-builder-question.component';

describe('DynamicFormBuilderQuestionComponent', () => {
  let component: DynamicFormBuilderQuestionComponent;
  let fixture: ComponentFixture<DynamicFormBuilderQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormBuilderQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormBuilderQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
