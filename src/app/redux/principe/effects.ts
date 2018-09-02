import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from "@ngrx/store";
import { Observable, of, merge } from "rxjs";
import { tap, map, switchMap, catchError, take, filter } from 'rxjs/operators';
import {
    AppMetadataStatusLoadingAction,
    AppMetadataSetErrorAction,
    AppMetadataStatusReadyAction
} from "../app-metadata/state";
import { PrincipeService } from "../../services/principe/principe.service";
import {
    PrincipeCollectionActionTypes,
    PrincipeCollectionGetsRequestAction,
    PrincipeCollectionGetsSuccessAction,
    PrincipeCollectionGetRequestAction,
    PrincipeCollectionGetSuccessAction,
    PrincipeCollectionPostRequestAction,
    PrincipeCollectionPostSuccessAction,
    PrincipeCollectionPutRequestAction,
    PrincipeCollectionPutSuccessAction,
    PrincipeCollectionDeleteRequestAction,
    PrincipeCollectionDeleteSuccessAction
} from "./state";

@Injectable()
export class PrincipeCollectionRequestEffect {
    constructor(
        public actions$: Actions,
        public store: Store<any>,
        public principe: PrincipeService
    ) {}

    getsRequest$: Observable<Action> = this.actions$.pipe(
      filter(action => action.type === PrincipeCollectionActionTypes.GetsRequest),
      tap(() => this.store.dispatch(new AppMetadataStatusLoadingAction)),
      switchMap((action: PrincipeCollectionGetsRequestAction) => this.principe.gets().pipe(
          map((response: any) => new PrincipeCollectionGetsSuccessAction(response)),
          catchError((error: Error) => of(new AppMetadataSetErrorAction(error.message)))
      )),
      tap(() => this.store.dispatch(new AppMetadataStatusReadyAction)),
    );

    getRequest$: Observable<Action> = this.actions$.pipe(
      filter(action => action.type === PrincipeCollectionActionTypes.GetRequest),
      tap(() => this.store.dispatch(new AppMetadataStatusLoadingAction)),
      switchMap((action: PrincipeCollectionGetRequestAction) => this.principe.get(action.id).pipe(
          map((response: any) => new PrincipeCollectionGetSuccessAction(response)),
          catchError((error: Error) => of(new AppMetadataSetErrorAction(error.message)))
      )),
      tap(() => this.store.dispatch(new AppMetadataStatusReadyAction)),
    );

    postRequest$: Observable<Action> = this.actions$.pipe(
      filter(action => action.type === PrincipeCollectionActionTypes.PostRequest),
      tap(() => this.store.dispatch(new AppMetadataStatusLoadingAction)),
      switchMap((action: PrincipeCollectionPostRequestAction) => this.principe.post(action.principe).pipe(
          map((response: any) => new PrincipeCollectionPostSuccessAction(response)),
          catchError((error: Error) => of(new AppMetadataSetErrorAction(error.message)))
      )),
      tap(() => this.store.dispatch(new AppMetadataStatusReadyAction)),
    );

    putRequest$: Observable<Action> = this.actions$.pipe(
      filter(action => action.type === PrincipeCollectionActionTypes.PutRequest),
      tap(() => this.store.dispatch(new AppMetadataStatusLoadingAction)),
      switchMap((action: PrincipeCollectionPutRequestAction) => this.principe.put(action.id, action.principe).pipe(
          map((response: any) => new PrincipeCollectionPutSuccessAction(response)),
          catchError((error: Error) => of(new AppMetadataSetErrorAction(error.message)))
      )),
      tap(() => this.store.dispatch(new AppMetadataStatusReadyAction)),
    );

    deleteRequest$: Observable<Action> = this.actions$.pipe(
      filter(action => action.type === PrincipeCollectionActionTypes.DeleteRequest),
      tap(() => this.store.dispatch(new AppMetadataStatusLoadingAction)),
      switchMap((action: PrincipeCollectionDeleteRequestAction) => this.principe.delete(action.id).pipe(
          map((response: any) => new PrincipeCollectionDeleteSuccessAction),
          catchError((error: Error) => of(new AppMetadataSetErrorAction(error.message)))
      )),
      tap(() => this.store.dispatch(new AppMetadataStatusReadyAction)),
    );

    @Effect()
    requests$ = merge(
        this.getsRequest$,
        this.getRequest$,
        this.postRequest$,
        this.putRequest$,
        this.deleteRequest$
    );

}