import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipesListComponent } from './principes-list.component';

describe('PrincipesListComponent', () => {
  let component: PrincipesListComponent;
  let fixture: ComponentFixture<PrincipesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
