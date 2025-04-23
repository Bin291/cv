import {createAction, props} from '@ngrx/store';
import {AuthModel} from '../../models/auth.model';


export const login = createAction('[Auth] Login');
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure',  props<{ error: any }>(),);

//storeAuth
export const storeAuth = createAction('[Auth] Store Auth', props<{ authData: AuthModel }>());

//logout
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure',  props<{ error: any }>());



//getAuth

export const getAuth = createAction(
  '[Auth] Get Auth',
  props<{ idToken: string }>(),
);
export const getAuthSuccess = createAction(
  '[Auth] Get Auth Success',
  props<{ auth: any }>(),
);

export const getAuthFailure = createAction(
  '[Auth] Get Auth Failure',
  props<{ error: any }>(),
);


export const clearState = createAction('[Auth] Clear State');
