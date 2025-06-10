// src/app/ngrx/resume/resume.state.ts
import { ResumeModel } from '../../models/resume.model';

export interface ResumeState {
  resumes: ResumeModel[];          // list
  resume: ResumeModel | null;      // selected / current
  loading: boolean;
  error: any;
}

export const initialState: ResumeState = {
  resumes: [],
  resume: null,
  loading: false,
  error: null,
};
