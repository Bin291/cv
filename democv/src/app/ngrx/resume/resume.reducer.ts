import { createReducer, on } from '@ngrx/store';
import {
  loadResume,
  loadResumeSuccess,
  loadResumeFailure,
  updateResume,
  updateResumeSuccess,
  updateResumeFailure,
  loadAllResumesSuccess,
  loadAllResumes,
  loadAllResumesFailure,
  createResume,
  createResumeSuccess,
  createResumeFailure,
} from './resume.action';
import * as ResumeActions from './resume.action';
import { initialState } from './resume.state';

export const resumeReducer = createReducer(
  initialState,

  // Load resume
  on(loadResume, (state,type) => {
    console.log(state, type);
    return {
      ...state,
      loading: true,
      error: null
    };
  }),

  on(loadResumeSuccess, (state, { resume }) => {
    console.log('Resume loaded successfully:', resume);
    return {
      ...state,
      loading: false,
      resume,
    };
  }),

  on(loadResumeFailure, (state, { error }) => {
    console.error('Error loading resume:', error, state);
    return {
      ...state,
      loading: false,
      error
    };
  }),

  // Update resume
  on(updateResume, (state, type) => {
    console.log('Updating resume...', state, type);
    return {
      ...state,
      loading: true,
      error: null
    };
  }),

  on(updateResumeSuccess, (state, { resume }) => {
    console.log('Resume updated successfully:', resume, state);
    return {
      ...state,
      loading: false,
      resume,
    };
  }),

  on(updateResumeFailure, (state, { error }) => {
    console.error('Error updating resume:', error, state);
    return {
      ...state,
      loading: false,
      error
    };
  }),
  on(loadAllResumes, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  // on(loadAllResumesSuccess, (state, { resumes }) => ({
  //   ...state,
  //   resumes,
  //   loading: false,
  // })),
  on(loadAllResumesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // --- Load single resume (nếu bạn có action loadResume) ---
  on(loadResumeSuccess, (state, { resume }) => ({
    ...state,
    resume,
  })),

  // --- Update resume ---
  on(updateResumeSuccess, (state, { resume }) => ({
    ...state,
    // cập nhật resume đơn
    resume,
    // cập nhật luôn trong list
    resumes: state.resumes.map(r => r.id === resume.id ? resume : r),
  })),
  on(updateResumeFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(createResume, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(createResumeSuccess, (state, { resume }) => ({
    ...state,
    resumes: [...state.resumes, resume]
  })),
  on(createResumeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadAllResumesSuccess, (state, { resumes }) => ({
    ...state,
    resumes
  })),

  on(ResumeActions.deleteResume, (state, { id }) => ({
    ...state,
    resumes: state.resumes.filter(resume => resume.id !== id),
  })),
  on(ResumeActions.deleteResumeSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ResumeActions.deleteResumeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ResumeActions.loadLinks, (state, { resumeId }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ResumeActions.loadLinksSuccess, (state, { links }) => ({
    ...state,
    loading: false,
    links,
  })),
  on(ResumeActions.loadLinksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
on(ResumeActions.updateResumeInStore, (state, { data }) => ({
  ...state,
  resume: data
}))
);



on(ResumeActions.changeFont, (state, { font }) => ({
        ...(state as object),
        selectedFont: font
      }))
