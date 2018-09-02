import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFormFieldComponent } from './file-form-field.component';

describe('FileFormFieldComponent', () => {
  let component: FileFormFieldComponent;
  let fixture: ComponentFixture<FileFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
