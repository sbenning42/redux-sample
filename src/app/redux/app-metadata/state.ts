import { Action } from '@ngrx/store';

export enum AppStatusTypes {
    off = 'APP_STATUS_OFF',
    ready = 'APP_STATUS_READY',
    loading = 'APP_STATUS_LOADING',
}

export interface AppMetadataState {
  name: string;
  version: string;
  status: AppStatusTypes;
  error: string;
}

export enum AppMetadataActionTypes {
  SetName = 'APP_METADATA_SET_NAME',
  SetVersion = 'APP_METADATA_SET_NAME',
  SetError = 'APP_METADATA_SET_ERROR',
  StatusOff = 'APP_METADATA_STATUS_OFF',
  StatusReady = 'APP_METADATA_STATUS_READY',
  StatusLoading = 'APP_METADATA_STATUS_LOADING',
}

export class AppMetadataSetNameAction implements Action {
  type = AppMetadataActionTypes.SetName;
  constructor(public name: string) {}
}

export class AppMetadataSetVersionAction implements Action {
  type = AppMetadataActionTypes.SetVersion;
  constructor(public version: string) {}
}

export class AppMetadataSetErrorAction implements Action {
  type = AppMetadataActionTypes.SetError;
  constructor(public error: string) {}
}

export class AppMetadataStatusOffAction implements Action {
  type = AppMetadataActionTypes.StatusOff;
  constructor() {}
}

export class AppMetadataStatusReadyAction implements Action {
  type = AppMetadataActionTypes.StatusReady;
  constructor() {}
}

export class AppMetadataStatusLoadingAction implements Action {
  type = AppMetadataActionTypes.StatusLoading;
  constructor() {}
}

export type AppMetadataActionsUnion = AppMetadataSetNameAction
  |AppMetadataSetVersionAction
  |AppMetadataSetErrorAction
  |AppMetadataStatusOffAction
  |AppMetadataStatusReadyAction
  |AppMetadataStatusLoadingAction;

export const initialAppMetadata: AppMetadataState = {
    name: 'My App',
    version: '1.0.0',
    status: AppStatusTypes.off,
    error: undefined
};

export function appMetadataReducer(
    state: AppMetadataState = initialAppMetadata,
    action: AppMetadataActionsUnion
): AppMetadataState {
    switch (action.type) {
        case AppMetadataActionTypes.SetName:
            return {...state, name: (<AppMetadataSetNameAction>action).name};
        case AppMetadataActionTypes.SetVersion:
            return {...state, version: (<AppMetadataSetVersionAction>action).version};
        case AppMetadataActionTypes.SetError:
            return {...state, error: (<AppMetadataSetErrorAction>action).error};
        case AppMetadataActionTypes.StatusOff:
            return {...state, status: AppStatusTypes.off};
        case AppMetadataActionTypes.StatusReady:
            return {...state, status: AppStatusTypes.ready};
        case AppMetadataActionTypes.StatusLoading:
            return {...state, status: AppStatusTypes.loading};
        default:
            return state;
    }
}