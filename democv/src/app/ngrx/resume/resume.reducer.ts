import { createReducer, on } from '@ngrx/store';
import {
  loadResume,
  loadResumeSuccess,
  loadResumeFailure,
  updateResume,
  updateResumeSuccess,
  updateResumeFailure
} from './resume.action';
import { initialResumeState } from './resume.state';

export const resumeReducer = createReducer(
  initialResumeState,

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
);
