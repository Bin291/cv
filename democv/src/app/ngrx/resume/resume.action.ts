import { createAction, props } from '@ngrx/store';
import { ResumeModel } from '../../models/resume.model';
import {LinkModel} from '../../models/link.model';

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
export const loadAllResumes = createAction(
  '[Resume] Load All Resumes'
);

export const loadAllResumesSuccess = createAction(
  '[Resume] Load All Resumes Success',
  props<{ resumes: ResumeModel[] }>()
);

export const loadAllResumesFailure = createAction(
  '[Resume] Load All Resumes Failure',
  props<{ error: any }>()
);

export const createResume = createAction(
  '[Resume] Create Resume',
  props<{ payload: Partial<ResumeModel> }>()
);

export const createResumeSuccess = createAction(
  '[Resume] Create Resume Success',
  props<{ resume: ResumeModel }>()
);

export const createResumeFailure = createAction(
  '[Resume] Create Resume Failure',
  props<{ error: any }>()
);

export const deleteResume = createAction(
  '[Resume] Delete Resume',
  props<{ id: string }>()
);
export const deleteResumeSuccess = createAction(
  '[Resume] Delete Resume Success',
  props<{ id: string }>()
);
export const deleteResumeFailure = createAction(
  '[Resume] Delete Resume Failure',
  props<{ error: any }>()
);

export const loadLinks = createAction('[Resume] Load Links', props<{ resumeId: string }>());
export const loadLinksSuccess = createAction('[Resume] Load Links Success', props<{ links: LinkModel[] }>());
export const loadLinksFailure = createAction('[Resume] Load Links Failure', props<{ error: any }>());
