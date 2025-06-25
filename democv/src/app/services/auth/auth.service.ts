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
  loginWithGoogle(): Observable<AuthModel | null> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      switchMap((result) => {
        const user = result.user;
        if (!user) return of(null);

        return from(user.getIdToken()).pipe(
          switchMap(idToken => {
            const authData: AuthModel = {
              idToken: idToken ?? null,
              uid: user.uid ?? null,
              email: user.email ?? null,
              displayName: user.displayName ?? null,
              photoURL: user.photoURL ?? null
            };
            window.location.reload();
            return of(authData);
          })
        );
      }

      ),
      catchError((error) => {
        console.error('Google login failed:', error);
        return of(null);
      })
    );
  }


  // loginWithGoogle() {
  //   return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
  //     switchMap(result => {
  //       const user = result.user;
  //       if (!user) return of(null);
  //
  //       // Lấy idToken bằng Observable
  //       return from(user.getIdToken()).pipe(
  //         switchMap(idToken => {
  //           const authData: AuthModel = {
  //             idToken: idToken,
  //             uid: user.uid,
  //             displayName: user.displayName || '',
  //             email: user.email || '',
  //             photoURL: user.photoURL || ''
  //           };
  //
  //           // Gọi API auth nếu cần
  //           return this.getAuth(idToken).pipe(
  //             switchMap(apiResult => {
  //
  //               // Gộp kết quả nếu muốn
  //               return of(authData); // hoặc of(apiResult) nếu bạn dùng API trả về
  //             })
  //           );
  //         })
  //       );
  //     }),
  //     catchError(error => {
  //       console.error('Login failed:', error);
  //       return of(null);
  //     })
  //   );
  // }


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
