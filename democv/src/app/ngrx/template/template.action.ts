import { createAction, props } from '@ngrx/store';
import { TemplateModel } from '../../models/template.model';

export const loadTemplates       = createAction('[Tpl] Load Templates', props<{ uid: string }>());
export const loadTemplatesSuccess = createAction('[Tpl] Load Success', props<{ templates: TemplateModel[] }>());
export const loadTemplatesFailure = createAction('[Tpl] Load Failure', props<{ error: any }>());
export const createTemplate      = createAction('[Tpl] Create Template', props<{ uid: string }>());
export const createTemplateSuccess = createAction('[Tpl] Create Success', props<{ template: TemplateModel }>());
export const createTemplateFailure = createAction('[Tpl] Create Failure', props<{ error: any }>());
export const deleteTemplate = createAction(
  '[Template] Delete Template',
  props<{ id: string; uid: string }>()
);

export const deleteTemplateSuccess = createAction('[Tpl] Delete Success', props<{ id: string }>());
export const deleteTemplateFailure = createAction('[Tpl] Delete Failure', props<{ error: any }>());
