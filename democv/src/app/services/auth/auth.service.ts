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
loginWithGoogle() {
      return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
        switchMap(() => {
          window.location.reload();
          return of(null);
        }),
        catchError((error) => {
          return of(GoogleAuthProvider.credentialFromError(error));
        })
      );
    }


logout() {
      return this.auth.signOut().then(() => window.location.reload());
    }
  /** Trả về Observable<AuthModel> rõ ràng */
  getAuth(idToken: string): Observable<AuthModel> {
    return this.http.get<AuthModel>(
      `${environment.apiUrl}auth`,
      { headers: { Authorization: idToken } }
    );
  }
  // Lấy thông tin người dùng hiện tại
  getCurrentUser(): Observable< User | null> {
    return user(this.auth); // Trả về Observable chứa thông tin người dùng
  }

  getIdToken(): Observable<string | null> {
    return this.getCurrentUser().pipe(
      switchMap(u => u ? from(u.getIdToken()) : of(null))
    );
  }

  async getIdTokenAsync(): Promise<string> {
    const u = await this.getCurrentUser().pipe(switchMap(u => u ? from(u.getIdToken()) : of(null))).toPromise();
    if (!u) throw new Error('User not authenticated');
    return u;
  }
}
