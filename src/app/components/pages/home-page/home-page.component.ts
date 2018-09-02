import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppMetadataStatusLoadingAction, AppMetadataSetErrorAction } from '../../../redux/app-metadata/state';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { AppAuthSetCredentialsAction, AppAuthAuthentifyRequestAction, AppAuthCreateUserRequestAction } from '../../../redux/app-auth/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrincipeCollectionPostRequestAction, PrincipeCollectionGetsRequestAction } from '../../../redux/principe/state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  authentified$: Observable<boolean>;
  principeCollection$: Observable<any[]>;
  principeCollectionLength$: Observable<number>;

  selectedPrincipe: any;

  constructor(public store: Store<any>) {
    this.authentified$ = this.store.select('auth').pipe(map(auth => auth.authentified));
    this.principeCollection$ = this.store.select('principe').pipe(map(principe => principe.collection));
    this.principeCollectionLength$ = this.principeCollection$.pipe(map(collection => collection.length));

    this.store.dispatch(new PrincipeCollectionGetsRequestAction);
  }

  ngOnInit() {
  }
  
  signIn(credentials: {email: string, password: string}) {
    this.store.dispatch(new AppAuthSetCredentialsAction(credentials.email, credentials.password));
    this.store.dispatch(new AppAuthAuthentifyRequestAction);
  }

  signUp(user: {email: string, name: string, password: string}) {
    this.store.dispatch(new AppAuthCreateUserRequestAction(user.email, user.name, user.password));
  }

  selectPrincipe(principe: any) {
    this.selectedPrincipe = principe;
  }

  savePrincipe(principe: any) {
    principe = {...principe, picture: principe.picture.file.name};
    this.store.dispatch(new PrincipeCollectionPostRequestAction(principe));
  }

  saveMakeup(makeup: any) {}

  saveArticle(article: any) {}

}
