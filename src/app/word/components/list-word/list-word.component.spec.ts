import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWordComponent } from './list-word.component';

describe('ListWordComponent', () => {
  let component: ListWordComponent;
  let fixture: ComponentFixture<ListWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
