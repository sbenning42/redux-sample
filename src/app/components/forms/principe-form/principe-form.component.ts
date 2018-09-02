import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-principe-form',
  templateUrl: './principe-form.component.html',
  styleUrls: ['./principe-form.component.css']
})
export class PrincipeFormComponent implements OnInit {

  _initialPrincipe: any;
  @Input() 
    set initialPrincipe(p: any) {
      this._initialPrincipe=p;
      this.nameControl.setValue(p?p.name:undefined);
      this.pictureControl.setValue('true');
    };
    get initialPrincipe(): any { return this._initialPrincipe; };

  @Output() savePrincipeEvent: EventEmitter<any> = new EventEmitter;

  principeForm: FormGroup;
  
  nameControl: FormControl;
  pictureControl: FormControl;

  fileEv: any;

  constructor() {
    this.nameControl = new FormControl('', [Validators.required]);
    this.pictureControl = new FormControl('', [Validators.required]);
    this.principeForm = new FormGroup({
      nameControl: this.nameControl,
      pictureControl: this.pictureControl,
    });
  }

  ngOnInit() {
    if (this.initialPrincipe) {
      this.nameControl.setValue(this.initialPrincipe.name);
      this.pictureControl.setValue('true');
    }
  }

  fileChange($event) {
    this.fileEv = $event;
    this.pictureControl.setValue('true');
  }
  cancel() {
    this.fileEv = undefined;
    this.pictureControl.setValue(undefined);
  }

  savePrincipe() {
    this.savePrincipeEvent.emit({
      name: this.nameControl.value,
      picture: this.fileEv
    });
  }

}
