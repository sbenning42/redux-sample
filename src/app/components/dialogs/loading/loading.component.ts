import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppMetadataStatusReadyAction } from '../../../redux/app-metadata/state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoadingComponent>,
    public store: Store<any>
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  close() {
    this.store.dispatch(new AppMetadataStatusReadyAction);
  }

}
