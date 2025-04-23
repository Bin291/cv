import {AuthModel} from '../../models/auth.model';

export interface AuthState{
  authData: AuthModel | null;
  isLogging: boolean;
  error: any;
  auth: any;


}
