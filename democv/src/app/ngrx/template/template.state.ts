import { TemplateModel } from '../../models/template.model';

export interface TemplateState {
  templates: TemplateModel[];
  loading: boolean;
  error: any;
}

export const initialTemplateState: TemplateState = {
  templates: [],
  loading: false,
  error: null
};
