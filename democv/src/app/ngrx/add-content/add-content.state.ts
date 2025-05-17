import { AddContentModel } from '../../models/add-content.model';

// Định nghĩa trạng thái của add-content
export interface AddContentState {
  addContent: AddContentModel[];
  error: string | null;
  loading: boolean;
}


