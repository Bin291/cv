import { createAction, props } from '@ngrx/store';
import {StyleConfig} from '../../models/style-setting.model';


export const loadStyle = createAction(
  '[Style] Load Style',
  props<{ resumeId: string }>()
);

export const loadStyleSuccess = createAction(
  '[Style] Load Style Success',
  props<{ style: StyleConfig }>()
);

export const loadStyleFailure = createAction(
  '[Style] Load Style Failure',
  props<{ error: any }>()
);

export const updateStyle = createAction(
  '[Style] Update Style',
  props<{ resumeId: string; patch: Partial<StyleConfig> }>()
);
