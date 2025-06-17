import {createAction, props} from '@ngrx/store';
import {LinkModel} from '../../models/link.model';

export const loadLinks = createAction(
  '[Links] Load All',
  props<{ resumeId: string }>()
);
export const loadLinksSuccess = createAction(
  '[Links] Load All Success',
  props<{ links: LinkModel[] }>()
);
export const loadLinksFailure = createAction(
  '[Links] Load All Failure',
  props<{ error: any }>()
);

export const addLink = createAction(
  '[Links] Add',
  props<{ link: Partial<LinkModel> }>()
);
export const addLinkSuccess = createAction(
  '[Links] Add Success',
  props<{ link: LinkModel }>()
);
export const addLinkFailure = createAction(
  '[Links] Add Failure',
  props<{ error: any }>()
);

export const updateLink = createAction(
  '[Links] Update',
  props<{ id: number; changes: Partial<LinkModel> }>()
);
export const updateLinkSuccess = createAction(
  '[Links] Update Success',
  props<{ link: LinkModel }>()
);
export const updateLinkFailure = createAction(
  '[Links] Update Failure',
  props<{ error: any }>()
);

export const deleteLink = createAction(
  '[Links] Delete',
  props<{ id: number }>()
);
export const deleteLinkSuccess = createAction(
  '[Links] Delete Success',
  props<{ id: number }>()
);
export const deleteLinkFailure = createAction(
  '[Links] Delete Failure',
  props<{ error: any }>()
);
