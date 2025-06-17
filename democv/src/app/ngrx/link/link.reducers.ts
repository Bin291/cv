// src/app/ngrx/link/link.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as LinkActions from './link.actions';
import { LinkModel } from '../../models/link.model';
import {LinkState} from './link.state';


export const initialState: LinkState = {
  links: [],
  loading: false,
  error: null
};

export const linkReducer = createReducer(
  initialState,

  on(LinkActions.loadLinks, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(LinkActions.loadLinksSuccess, (state, { links }) => ({
    ...state,
    links,
    loading: false
  })),
  on(LinkActions.loadLinksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(LinkActions.addLinkSuccess, (state, { link }) => ({
    ...state,
    links: [...state.links, link]
  })),
  on(LinkActions.addLinkFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(LinkActions.updateLinkSuccess, (state, { link }) => ({
    ...state,
    links: state.links.map(l => l.id === link.id ? link : l)
  })),
  on(LinkActions.updateLinkFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(LinkActions.deleteLinkSuccess, (state, { id }) => ({
    ...state,
    links: state.links.filter(l => l.id !== id)
  })),
  on(LinkActions.deleteLinkFailure, (state, { error }) => ({
    ...state,
    error
  })),
);
