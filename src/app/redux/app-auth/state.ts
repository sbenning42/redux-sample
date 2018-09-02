import { Action } from '@ngrx/store';

export interface AppAuthState {
  authentified: boolean;
  credentials: {login: string, password: string};
  user: any;
  token: string;
}

export enum AppAuthActionTypes {
  SetCredentials = 'APP_AUTH_SET_CREDENTIALS',
  AuthentifyRequest = 'APP_AUTH_AUTHENTIFY_REQUEST',
  AuthentifySuccess = 'APP_AUTH_AUTHENTIFY_SUCCESS',
  CreateUserRequest = 'APP_AUTH_CREATE_USER_REQUEST',
  CreateUserSuccess = 'APP_AUTH_CREATE_USER_SUCCESS',
}

export class AppAuthSetCredentialsAction implements Action {
  type = AppAuthActionTypes.SetCredentials;
  constructor(
    public login: string, public password: string, 
  ) {}
}

export class AppAuthAuthentifyRequestAction implements Action {
  type = AppAuthActionTypes.AuthentifyRequest;
  constructor() {}
}

export class AppAuthAuthentifySuccessAction implements Action {
  type = AppAuthActionTypes.AuthentifySuccess;
  constructor(
    public user: any, public token: string, 
  ) {}
}

export class AppAuthCreateUserRequestAction implements Action {
  type = AppAuthActionTypes.CreateUserRequest;
  constructor(public email: string, public name: string, public password: string) {}
}

export class AppAuthCreateUserSuccessAction implements Action {
  type = AppAuthActionTypes.CreateUserSuccess;
  constructor() {}
}

export type AppAuthActionsUnion = AppAuthSetCredentialsAction
  |AppAuthAuthentifyRequestAction
  |AppAuthAuthentifySuccessAction
  |AppAuthCreateUserRequestAction
  |AppAuthCreateUserSuccessAction;

export const initialAppAuthState: AppAuthState = {
    authentified: false,
    credentials: undefined,
    user: undefined,
    token: undefined
};

export function appAuthReducer(state: AppAuthState = initialAppAuthState, action: AppAuthActionsUnion): AppAuthState {
    switch (action.type) {
        case AppAuthActionTypes.SetCredentials:
            return {
                ...state,
                credentials: {
                    login: (<AppAuthSetCredentialsAction>action).login,
                    password: (<AppAuthSetCredentialsAction>action).password
                }
            };
        case AppAuthActionTypes.AuthentifyRequest:
            return {...state, authentified: false, user: undefined, token: undefined};
        case AppAuthActionTypes.AuthentifySuccess:
            return {
                ...state,
                authentified: true,
                user: (<AppAuthAuthentifySuccessAction>action).user,
                token: (<AppAuthAuthentifySuccessAction>action).token,
            };
        case AppAuthActionTypes.CreateUserRequest:
        case AppAuthActionTypes.CreateUserSuccess:
        default:
            return state;
    }
}