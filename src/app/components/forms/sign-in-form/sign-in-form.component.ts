import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  @Input() initialEmail: string;
  @Input() initialPassword: string;

  @Output() signInEvent: EventEmitter<{email: string, password: string}> = new EventEmitter;

  signInForm: FormGroup;
  emailControl: FormControl;
  passwordControl: FormControl;

  constructor() {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.passwordControl = new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]);
    this.signInForm = new FormGroup({
      emailControl: this.emailControl,
      passwordControl: this.passwordControl
    });
  }

  ngOnInit() {
    this.emailControl.setValue(this.initialEmail);
    this.passwordControl.setValue(this.initialPassword);
  }

  signInRequest() {
    this.signInEvent.emit({
      email: this.emailControl.value,
      password: this.passwordControl.value
    });
  }

}
