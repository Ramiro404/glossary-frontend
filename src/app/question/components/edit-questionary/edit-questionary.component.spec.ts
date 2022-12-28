import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionaryComponent } from './edit-questionary.component';

describe('EditQuestionaryComponent', () => {
  let component: EditQuestionaryComponent;
  let fixture: ComponentFixture<EditQuestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
