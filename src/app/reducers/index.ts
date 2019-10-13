import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {IAppState} from '../state/app.state';
import {shapeReducers} from './shape-reducer';

export const reducers: ActionReducerMap<IAppState> = {
  shapes: shapeReducers
};

export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];
