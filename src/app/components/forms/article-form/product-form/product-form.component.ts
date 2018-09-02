import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ArticleProductFormComponent implements OnInit {

  productForm: FormGroup;
  
  nameControl: FormControl;

  constructor() {
    this.nameControl = new FormControl('', [Validators.required]);
    this.productForm = new FormGroup({
      nameControl: this.nameControl
    });
  }

  ngOnInit() {
  }

}
