import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-file-form-field',
  templateUrl: './file-form-field.component.html',
  styleUrls: ['./file-form-field.component.css']
})
export class FileFormFieldComponent implements OnInit {

  @Input() buttonMatColor: string;
  @Input() buttonLabel: string;
  @Input() inputLabel: string;
  @Input() inputPlaceholder: string;
  @Input() inputRequired: boolean;
  @Input() inputAccept: string;
  _initialUrl: string;
  @Input()
    set initialUrl(u: string) {
      this._initialUrl=u;
      this.fileData = u;
      this.fileControl.setValue('true');
    };
    get initialUrl(): string { return this._initialUrl; };
  _initialName: string;
  @Input()
    set initialName(n: string) {
      this._initialName=n;
      this.inputControl.setValue(n);
    };
    get initialName(): string { return this._initialName; };
  @Output() fileChangeEvent: EventEmitter<any> = new EventEmitter;
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter;

  @ViewChild('obj') obj: ElementRef;

  acceptImg: boolean = false;
  acceptPdf: boolean = false;

  fileForm: FormGroup;

  inputControl: FormControl;
  fileControl: FormControl;
  file: File;
  fileData: any;

  reader: FileReader = new FileReader;

  constructor(public sanitizer: DomSanitizer) {
    this.inputControl = new FormControl({value: '', disabled: true}, [Validators.required]);
    this.fileControl = new FormControl('');
    this.fileForm = new FormGroup({
      inputControl: this.inputControl,
      fileControl: this.fileControl
    });
  }

  ngOnInit() {
    this.fileControl.setValidators(this.inputRequired ? [fileRequired] : []);
    this.acceptImg = this.inputAccept.search('image') !== -1 ? true : false;
    this.acceptPdf = this.inputAccept.search('pdf') !== -1 ? true : false;
    if (this.initialName) {
      this.inputControl.setValue(this.initialName);
    }
    if (this.initialUrl) {
      this.fileData = this.initialUrl;
      this.fileControl.setValue('true');
    }
  }

  fileChange($event) {
    this.file = $event.srcElement.files[0];
    this.inputControl.setValue(this.file.name);
    this.reader.onload = () => {
      this.fileData = this.reader.result;
      if (this.acceptPdf && this.file.type.search('pdf') !== -1) {
        setTimeout(() => this.obj.nativeElement.data = this.fileData, 0);
      }
    };
    this.reader.readAsDataURL(this.file);
    this.fileControl.setValue('true');
    this.fileChangeEvent.emit({
      file: this.file,
      data: this.fileData
    });
  }

  cancel() {
    this.file = undefined;
    this.inputControl.setValue(undefined);
    this.fileControl.setValue(undefined);
    this.fileData = undefined;
    this.cancelEvent.emit();
  }

}

function fileRequired(c: AbstractControl) {
  return c.value ? {} : {required: true};
}
