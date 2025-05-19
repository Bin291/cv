import { Injectable } from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup, user,User} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {catchError, from, Observable, of, switchMap} from 'rxjs';
import {environment} from '../../environments/environment';
import { UserCredential } from '@angular/fire/auth';
import {AuthModel} from '../../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private http: HttpClient) {}
  loginWithGoogle(){
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      catchError((error) => {
        return of(GoogleAuthProvider.credentialFromError(error))
      })
    )
  }

  logout() {
    return this.auth.signOut() ;
  }

  getAuth(idToken: string) {
    console.log(idToken);
    return this.http.get(`${environment.apiUrl}auth`, {
      headers: {
        Authorization: idToken,
      },
    });
  }
  // Lấy thông tin người dùng hiện tại
  getCurrentUser(): Observable< User | null> {
    return user(this.auth); // Trả về Observable chứa thông tin người dùng
  }
}
