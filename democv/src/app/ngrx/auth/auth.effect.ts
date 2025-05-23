import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';

export const login = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => {
        // console.log('[Effect] login triggered');
        return authService.loginWithGoogle().pipe(
          switchMap((credential: any) => {
            // console.log('[Effect] Google login success');

            // ⚠️ Lấy idToken rồi tạo action tiếp theo
            return from(credential.user.getIdToken() as Promise<string>).pipe(
              map((idToken: string) => {
                // console.log('[Effect] Got idToken:', idToken);

                // ✅ Dispatch action gọi API backend
                return AuthActions.getAuth({ idToken });
              })
            );
          }),
          catchError((error) => {
            console.error('[Effect] Google login failed:', error);
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        );
      })
    );
  },
  { functional: true },
);

export const getAuth = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.getAuth),
      switchMap(({ idToken }) => {
        // console.log('[Effect] Calling backend with idToken...');
        return authService.getAuth(idToken).pipe(
          switchMap((auth: any) => {
            // console.log('[Effect] Got auth from backend:', auth);
            return [
              AuthActions.loginSuccess(),
              AuthActions.storeAuth({ authData: auth }),
              AuthActions.getAuthSuccess({ auth }),
            ];
          }),
          catchError((error) => {
            console.error('[Effect] Backend error:', error);
            return of(AuthActions.getAuthFailure({ error: error.message }));
          })
        );
      })
    );
  },
  { functional: true },
);

export const logout = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return from(authService.logout()).pipe(
          map(() => AuthActions.logoutSuccess()),
        );
      }),
      catchError((error) => {
        console.error('[Effect] Logout failed:', error);
        return of(AuthActions.logoutFailure({ error: error.message }));
      }),
    );
  },
  { functional: true },
);
