import {LinkModel} from '../../models/link.model';

export interface LinkState {
  links: LinkModel[];
  loading: boolean;
  error: any;
}
