import { createReducer, on } from '@ngrx/store';
import * as AddContentActions from './add-content.action';
import  {AddContentState} from './add-content.state';

export const initialState: AddContentState = {
  addContent: [],
  error: null,
  loading: false,
};

export const addContentReducer = createReducer(
  initialState,
  on(AddContentActions.loadAddContents, (state,{type}) => {
    // console.log('loadAddContents', type);
    return {
      ...state,
      loading: true,
      error: null,
    }

  }),
  on(AddContentActions.loadAddContentsSuccess, (state, { addContents,type }) => {
    // console.log('loadAddContentsSuccess', type);
    // console.log("contents", addContents)

    return {
      ...state,
      addContent: addContents,
      loading: false,
    }


  }),
  on(AddContentActions.loadAddContentsFailure, (state, { error }) => {
    // console.log('loadAddContentsFailure', error);
    return {
      ...state,
      error,
      loading: false,
    }
  })
);
