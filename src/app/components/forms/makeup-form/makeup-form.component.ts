import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-makeup-form',
  templateUrl: './makeup-form.component.html',
  styleUrls: ['./makeup-form.component.css']
})
export class MakeupFormComponent implements OnInit {

  @Output() saveMakeupEvent: EventEmitter<any> = new EventEmitter;

  makeupForm: FormGroup;
  
  nameControl: FormControl;
  picture1Control: FormControl;
  picture2Control: FormControl;
  pdfControl: FormControl;

  picture1Ev: any;
  picture2Ev: any;
  pdfEv: any;

  constructor() {
    this.nameControl = new FormControl('', [Validators.required]);
    this.picture1Control = new FormControl('', [Validators.required]);
    this.picture2Control = new FormControl('', [Validators.required]);
    this.pdfControl = new FormControl('', [Validators.required]);
    this.makeupForm = new FormGroup({
      nameControl: this.nameControl,
      picture1Control: this.picture1Control,
      picture2Control: this.picture2Control,
      pdfControl: this.pdfControl
    });
  }

  ngOnInit() {
  }
  
  picture1Change($event) {
    this.picture1Ev = $event;
    this.picture1Control.setValue('true');
  }
  cancel1() {
    this.picture1Ev = undefined;
    this.picture1Control.setValue(undefined);
  }
  
  picture2Change($event) {
    this.picture2Ev = $event;
    this.picture2Control.setValue('true');
  }
  cancel2() {
    this.picture2Ev = undefined;
    this.picture2Control.setValue(undefined);
  }

  pdfChange($event) {
    this.pdfEv = $event;
    this.pdfControl.setValue('true');
  }
  cancelPdf() {
    this.pdfEv = undefined;
    this.pdfControl.setValue(undefined);
  }

  saveMakeup() {
    this.saveMakeupEvent.emit({
      name: this.nameControl.value,
      picture1: this.picture1Ev,
      picture2: this.picture2Ev,
      pdf: this.pdfEv
    });
  }

}
