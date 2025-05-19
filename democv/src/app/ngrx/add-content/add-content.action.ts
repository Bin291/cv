import { createAction, props } from '@ngrx/store';
import { AddContentModel } from '../../models/add-content.model';

export const loadAddContents = createAction('[AddContent] Load AddContents');

export const loadAddContentsSuccess = createAction(
  '[AddContent] Load AddContents Success',
  props<{ addContents: AddContentModel[] }>()
);

export const loadAddContentsFailure = createAction(
  '[AddContent] Load AddContents Failure',
  props<{ error: any }>()
);
