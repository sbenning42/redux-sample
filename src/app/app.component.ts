import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppMetadataState, AppStatusTypes, AppMetadataStatusReadyAction, AppMetadataSetErrorAction } from './redux/app-metadata/state';
import { MatDialog, MatDialogRef } from '../../node_modules/@angular/material';
import { LoadingComponent } from './components/dialogs/loading/loading.component';
import { ErrorComponent } from './components/dialogs/error/error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string;
  ready: boolean = false;

  isLoading: boolean = false;
  loadingRef: MatDialogRef<LoadingComponent>;

  isError: boolean = false;
  errorRef: MatDialogRef<ErrorComponent>;

  constructor(public store: Store<any>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store.select('metadata').subscribe((metadata: AppMetadataState) => {
      this.title = metadata.name;
      this.ready = metadata.status !== AppStatusTypes.off;
      this.loadingEffect(metadata.status);
      this.errorEffect(metadata.error);
    });
    this.store.dispatch(new AppMetadataStatusReadyAction);
  }

  loadingEffect(status: AppStatusTypes) {
    if (status === AppStatusTypes.loading && !this.isLoading) {
      this.openLoading();
      this.isLoading = true;
    } else if (status === AppStatusTypes.ready && this.isLoading) {
      this.loadingRef.close();
      this.isLoading = false;
    }
  }

  errorEffect(error: string) {
    if (error && !this.isError) {
      this.openError(error);
      this.isError = true;
    } else if (!error && this.isError) {
      this.errorRef.close();
      this.isError = false;
    }
  }

  openLoading(): void {
    this.loadingRef = this.dialog.open(LoadingComponent, {});
    this.loadingRef.beforeClose().subscribe(result => {
      if (this.isLoading) {
        this.store.dispatch(new AppMetadataStatusReadyAction);
      }
    });
  }

  openError(error: string): void {
    this.errorRef = this.dialog.open(ErrorComponent, {data: {error}});
    this.errorRef.beforeClose().subscribe(result => {
      if (this.isError) {
        this.store.dispatch(new AppMetadataSetErrorAction(undefined));
      }
    });
  }

}
