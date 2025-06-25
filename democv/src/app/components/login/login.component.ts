import { Component } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MatButton} from '@angular/material/button';
import {storeAuth} from '../../ngrx/auth/auth.actions';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {AuthModel} from '../../models/auth.model';
import * as AuthActions from '../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private store: Store<{auth: AuthState}>) {}

  login() {
    this.store.dispatch(AuthActions.login());

  }

}
