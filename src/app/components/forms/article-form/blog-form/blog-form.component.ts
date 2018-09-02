import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  @Output() saveArticleBlogEvent: EventEmitter<any> = new EventEmitter;

  blogForm: FormGroup;
  
  nameControl: FormControl;

  constructor() {
    this.nameControl = new FormControl('', [Validators.required]);
    this.blogForm = new FormGroup({
      nameControl: this.nameControl
    });
  }

  ngOnInit() {
  }

  saveBlog() {
    this.saveArticleBlogEvent.emit({
      name: this.nameControl.value
    });
  }

}
