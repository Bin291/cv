import { ResumeModel } from '../../models/resume.model';

export interface ResumeState {
  resume: ResumeModel | null;
  loading: boolean;
  error: any;
}

export const initialResumeState: ResumeState = {
  resume: null,
  loading: false,
  error: null
};
