import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipeFormComponent } from './principe-form.component';

describe('PrincipeFormComponent', () => {
  let component: PrincipeFormComponent;
  let fixture: ComponentFixture<PrincipeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
