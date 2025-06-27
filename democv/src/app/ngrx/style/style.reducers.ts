import { createReducer, on } from '@ngrx/store';
import {StyleConfig} from '../../models/style-setting.model';
import * as StyleActions from './style.actions';

export interface StyleState {
  style: StyleConfig | null;
  error: any;
}

export const initialState: StyleState = {
  style: null,
  error: null
};

export const styleReducer = createReducer(
  initialState,
  on(StyleActions.loadStyleSuccess, (state, { style }) => ({
    ...state,
    style,
    error: null
  })),
  on(StyleActions.loadStyleFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
