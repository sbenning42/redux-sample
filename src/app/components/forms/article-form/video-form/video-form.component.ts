import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {

  videoForm: FormGroup;
  
  nameControl: FormControl;

  constructor() {
    this.nameControl = new FormControl('', [Validators.required]);
    this.videoForm = new FormGroup({
      nameControl: this.nameControl
    });
  }

  ngOnInit() {
  }

}
