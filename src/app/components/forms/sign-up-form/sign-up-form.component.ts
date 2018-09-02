import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  @Input() initialEmail: string;
  @Input() initialName: string;
  @Input() initialPassword: string;

  @Output() signUpEvent: EventEmitter<{
    email: string,
    name: string,
    password: string
  }> = new EventEmitter;

  signUpForm: FormGroup;
  emailControl: FormControl;
  nameControl: FormControl;
  passwordControl: FormControl;

  constructor() {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.nameControl = new FormControl('', [
      Validators.required
    ]);
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.signUpForm = new FormGroup({
      emailControl: this.emailControl,
      nameControl: this.nameControl,
      passwordControl: this.passwordControl
    });
  }

  ngOnInit() {
    this.emailControl.setValue(this.initialEmail);
    this.nameControl.setValue(this.initialName);
    this.passwordControl.setValue(this.initialPassword);
  }

  signUpRequest() {
    this.signUpEvent.emit({
      email: this.emailControl.value,
      name: this.nameControl.value,
      password: this.passwordControl.value
    });
  }

}
