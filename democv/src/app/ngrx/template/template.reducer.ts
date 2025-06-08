import { createReducer, on } from '@ngrx/store';
import {
  loadTemplates,
  loadTemplatesSuccess,
  loadTemplatesFailure,
  createTemplate,
  createTemplateSuccess,
  createTemplateFailure,
  deleteTemplate,
  deleteTemplateSuccess,
  deleteTemplateFailure
} from './template.action';
import { TemplateState, initialTemplateState } from './template.state';

export const templateReducer = createReducer(
  initialTemplateState,

  on(loadTemplates, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loadTemplatesSuccess, (state, { templates }) => ({
    ...state,
    templates,
    loading: false
  })),

  on(loadTemplatesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(createTemplate, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(createTemplateSuccess, (state, { template }) => ({
    ...state,
    templates: [...state.templates, template],
    loading: false
  })),

  on(createTemplateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(deleteTemplate, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(deleteTemplateSuccess, (state, { id }) => ({
    ...state,
    templates: state.templates.filter(t => t.id !== id)
  })),

  on(deleteTemplateFailure, (state, { error }) => {
    console.error('Error deleting template:', error);
    return {
      ...state,
      error
    };
  })
);
