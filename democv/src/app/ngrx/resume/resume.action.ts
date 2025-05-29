import { createAction, props } from '@ngrx/store';
import { ResumeModel } from '../../models/resume.model';

// Load
export const loadResume = createAction(
  '[Resume] Load Resume',
  props<{ id: string }>()
);

export const loadResumeSuccess = createAction(
  '[Resume] Load Resume Success',
  props<{ resume: ResumeModel }>()
);

export const loadResumeFailure = createAction(
  '[Resume] Load Resume Failure',
  props<{ error: any }>()
);

// Update
export const updateResume = createAction(
  '[Resume] Update Resume',
  props<{ id: string; data: Partial<ResumeModel> }>()
);

export const updateResumeSuccess = createAction(
  '[Resume] Update Resume Success',
  props<{ resume: ResumeModel }>()
);

export const updateResumeFailure = createAction(
  '[Resume] Update Resume Failure',
  props<{ error: any }>()
);
