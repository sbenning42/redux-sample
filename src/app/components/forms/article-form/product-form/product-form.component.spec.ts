import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleProductFormComponent } from './product-form.component';

describe('ArticleProductFormComponent', () => {
  let component: ArticleProductFormComponent;
  let fixture: ComponentFixture<ArticleProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
