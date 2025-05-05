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

  constructor(private auth: Auth, private http: HttpClient) {
  }


  loginWithGoogle(): Observable<UserCredential | null> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }


  logout() {
    return this.auth.signOut();
  }

  getAuth(idToken: string): Observable<any> {
    console.log('[Frontend] Gửi token tới backend:', idToken);
    return this.http.get(`${environment.apiUrl}auth`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  }






  // Lấy thông tin người dùng hiện tại
  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        observer.next(user);
      });
    });
  }
}
