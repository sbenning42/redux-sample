import { Action } from '@ngrx/store';

export interface PrincipeCollectionState {
  fetched: boolean;
  collection: any[];
}

export enum PrincipeCollectionActionTypes {
  GetsRequest = 'PRINCIPE_COLLECTION_GETS_REQUEST_ACTION',
  GetsSuccess = 'PRINCIPE_COLLECTION_GETS_SUCCESS_ACTION',
  GetRequest = 'PRINCIPE_COLLECTION_GET_REQUEST_ACTION',
  GetSuccess = 'PRINCIPE_COLLECTION_GET_SUCCESS_ACTION',
  PostRequest = 'PRINCIPE_COLLECTION_POST_REQUEST_ACTION',
  PostSuccess = 'PRINCIPE_COLLECTION_POST_SUCCESS_ACTION',
  PutRequest = 'PRINCIPE_COLLECTION_PUT_REQUEST_ACTION',
  PutSuccess = 'PRINCIPE_COLLECTION_PUT_SUCCESS_ACTION',
  DeleteRequest = 'PRINCIPE_COLLECTION_DELETE_REQUEST_ACTION',
  DeleteSuccess = 'PRINCIPE_COLLECTION_DELETE_SUCCESS_ACTION',
  
}

export class PrincipeCollectionGetsRequestAction implements Action {
  type = PrincipeCollectionActionTypes.GetsRequest;
  constructor() {}
}

export class PrincipeCollectionGetsSuccessAction implements Action {
  type = PrincipeCollectionActionTypes.GetsSuccess;
  constructor(public principes: any[]) {}
}

export class PrincipeCollectionGetRequestAction implements Action {
  type = PrincipeCollectionActionTypes.GetRequest;
  constructor(public id: string) {}
}

export class PrincipeCollectionGetSuccessAction implements Action {
  type = PrincipeCollectionActionTypes.GetSuccess;
  constructor(public principe: any) {}
}

export class PrincipeCollectionPostRequestAction implements Action {
  type = PrincipeCollectionActionTypes.PostRequest;
  constructor(public principe: any) {}
}

export class PrincipeCollectionPostSuccessAction implements Action {
  type = PrincipeCollectionActionTypes.PostSuccess;
  constructor(public principe: any) {}
}

export class PrincipeCollectionPutRequestAction implements Action {
  type = PrincipeCollectionActionTypes.PutRequest;
  constructor(public id: string, public principe: any) {}
}

export class PrincipeCollectionPutSuccessAction implements Action {
  type = PrincipeCollectionActionTypes.PutSuccess;
  constructor(public principe: any) {}
}

export class PrincipeCollectionDeleteRequestAction implements Action {
  type = PrincipeCollectionActionTypes.DeleteRequest;
  constructor(public id: string) {}
}

export class PrincipeCollectionDeleteSuccessAction implements Action {
  type = PrincipeCollectionActionTypes.DeleteSuccess;
  constructor() {}
}

export type PrincipeCollectionActionsUnion = PrincipeCollectionGetsRequestAction
  |PrincipeCollectionGetsSuccessAction
  |PrincipeCollectionGetRequestAction
  |PrincipeCollectionGetSuccessAction
  |PrincipeCollectionPostRequestAction
  |PrincipeCollectionPostSuccessAction
  |PrincipeCollectionPutRequestAction
  |PrincipeCollectionPutSuccessAction
  |PrincipeCollectionDeleteRequestAction
  |PrincipeCollectionDeleteSuccessAction;

export const initialPrincipeCollectionState: PrincipeCollectionState = {
    fetched: false,
    collection: []
};

export function principeCollectionReducer(
    state: PrincipeCollectionState = initialPrincipeCollectionState,
    action: PrincipeCollectionActionsUnion
): PrincipeCollectionState {
    switch (action.type) {
        case PrincipeCollectionActionTypes.GetsSuccess:
            return {...state, fetched: true, collection: [...(<PrincipeCollectionGetsSuccessAction>action).principes]};
        case PrincipeCollectionActionTypes.GetSuccess: {
            const i = state.collection.findIndex(i => i.id === (<PrincipeCollectionGetSuccessAction>action).principe.id);
            state.collection[i] = (<PrincipeCollectionGetSuccessAction>action).principe;
            return {...state, collection: [...state.collection]};
        }
        case PrincipeCollectionActionTypes.PostSuccess: {
          const collection = [...state.collection, (<PrincipeCollectionPostSuccessAction>action).principe];
            return {...state, collection};
        }
        case PrincipeCollectionActionTypes.PutSuccess: {
            const i = state.collection.findIndex(i => i.id === (<PrincipeCollectionPutSuccessAction>action).principe.id);
            state.collection[i] = (<PrincipeCollectionPutSuccessAction>action).principe;
            return {...state, collection: [...state.collection]};
        }
        case PrincipeCollectionActionTypes.DeleteRequest:
            this.id = (<PrincipeCollectionDeleteRequestAction>action).id;
            return state;
        case PrincipeCollectionActionTypes.DeleteSuccess:
            return {...state, collection: state.collection.filter(i => i.id !== this.id)};
        case PrincipeCollectionActionTypes.GetsRequest:
        case PrincipeCollectionActionTypes.GetRequest:
        case PrincipeCollectionActionTypes.PostRequest:
        case PrincipeCollectionActionTypes.PutRequest:
        default:
            return state;
    }
}
