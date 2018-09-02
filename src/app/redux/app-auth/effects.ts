import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from "@ngrx/store";
import { Observable, of, merge } from "rxjs";
import { tap, map, switchMap, catchError, take, filter } from 'rxjs/operators';
import { AppMetadataStatusLoadingAction, AppMetadataSetErrorAction, AppMetadataStatusReadyAction } from "../app-metadata/state";
import { AuthService } from "../../services/auth/auth.service";
import { AppAuthState, AppAuthAuthentifySuccessAction, AppAuthActionTypes, AppAuthCreateUserRequestAction, AppAuthCreateUserSuccessAction, AppAuthSetCredentialsAction, AppAuthAuthentifyRequestAction } from "./state";

@Injectable()
export class AppAuthSignInRequestEffect {
    constructor(
        public actions$: Actions,
        public store: Store<any>,
        public auth: AuthService
    ) {}
    @Effect()
    signInRequest$ = this.actions$.pipe(
        filter((action: Action) => action.type === AppAuthActionTypes.AuthentifyRequest),
        tap(() => this.store.dispatch(new AppMetadataStatusLoadingAction)),
        switchMap(() => this.store.select('auth').pipe(take(1))),
        switchMap((authState: AppAuthState) => this.auth.loginRequest(authState.credentials).pipe(
            map((response: any) => new AppAuthAuthentifySuccessAction(response.user, response.token)),
            catchError((error: Error) => of(new AppMetadataSetErrorAction(error.message)))
        )),
        tap(() => this.store.dispatch(new AppMetadataStatusReadyAction))
    );
}

@Injectable()
export class AppAuthCreateUserRequestEffect {
    credentials: {login: string, password: string};
    constructor(
        public actions$: Actions,
        public store: Store<any>,
        public auth: AuthService
    ) {}
    @Effect()
    createUserRequest$ = this.actions$.pipe(
        filter((action: Action) => action.type === AppAuthActionTypes.CreateUserRequest),
        tap((action: AppAuthCreateUserRequestAction) => this.credentials = {
            login: action.email,
            password: action.password
        }),
        tap(() => this.store.dispatch(new AppMetadataStatusLoadingAction)),
        switchMap((createUserRequest: AppAuthCreateUserRequestAction) => this.auth.createUserRequest({
            email: createUserRequest.email,
            name: createUserRequest.name,
            password: createUserRequest.password,
        }).pipe(
            tap(() => this.store.dispatch(new AppAuthCreateUserSuccessAction)),
            tap(() => this.store.dispatch(new AppAuthSetCredentialsAction(this.credentials.login, this.credentials.password))),
            map(() => new AppAuthAuthentifyRequestAction),
            catchError((error: Error) => of(new AppMetadataSetErrorAction(error.message)).pipe(
                tap(() => this.store.dispatch(new AppMetadataStatusReadyAction)),
            )),
        )),
    );
}

