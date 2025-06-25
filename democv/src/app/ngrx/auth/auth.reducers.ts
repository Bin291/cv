import {AuthState} from './auth.state';
import {createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  authData: null,
  isLogging: false,
  error: null,
  auth: null,
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state,{type}) => {
    console.log(type);

    return <AuthState>{
      ...state,

      authData: null,
      isLogging: true,
    }
  }),
  on(AuthActions.loginSuccess, (state,{type}) => {
    console.log(type);
    return <AuthState>{
      ...state,
      isLogging: false,
    }
  }),
  on(AuthActions.loginFailure, (state, { error , type}) => {
    console.log(type);
    return <AuthState>{
      ...state,
      isLogging: false,
      error: error,
    }
  }),
  on(AuthActions.storeAuth, (state, { authData, type }) => {
    console.log(type);
    return <AuthState> {
      ...state,
      authData: authData,
    }
  }),

  on(AuthActions.logout, (state,{type}) => {
    console.log(type);
    return <AuthState>{
      ...state,
      isLogging: false,
      authData: null,
      error: null,
    }
  }),

  on(AuthActions.logoutSuccess, (state,{type}) => {
    console.log(type);
    return <AuthState>{
      ...state,
      isLogging: false,
      authData: null,
      error: null,
    }
  }),

  on(AuthActions.logoutFailure, (state, { error , type}) => {
    console.log(type);
    return <AuthState>{
      ...state,
      error: error,
    }
  }),

  on(AuthActions.clearState, (state, {type}) => {
    console.log(type);
    return <AuthState>{
      ...state,
      authData: null,
      isLogging: false,
      error: null,
      auth: null
    }
  })


)
