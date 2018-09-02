import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppMetadataSetErrorAction } from '../../../redux/app-metadata/state';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorComponent>,
    public store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: {error: string}
  ) { }

  ngOnInit() {
  }

  close() {
    this.store.dispatch(new AppMetadataSetErrorAction(undefined));
  }

}
