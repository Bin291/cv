import { createEffect, ofType, Actions } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as ResumeActions from './resume.action';
import { ResumeService } from '../../services/resume/resume.service';
import {catchError, from, map, mergeMap, of, switchMap, withLatestFrom} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {filter, take, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';


// ✅ Effect: Load Resume
export const loadResume = createEffect(
  (actions$ = inject(Actions), resumeService = inject(ResumeService)) => {
    return actions$.pipe(
      ofType(ResumeActions.loadResume),
      switchMap(({ id }) =>
        resumeService.getResume(id).pipe(
          map(resume => {
            const parsedContents =
              typeof resume.contents === 'string'
                ? JSON.parse(resume.contents)
                : resume.contents;

            return ResumeActions.loadResumeSuccess({
              resume: {
                ...resume,
                contents: parsedContents
              }
            });
          }),
          catchError(error => of(ResumeActions.loadResumeFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

// ✅ Effect: Update Resume
export const updateResume = createEffect(
  (actions$ = inject(Actions), resumeService = inject(ResumeService)) => {
    return actions$.pipe(
      ofType(ResumeActions.updateResume),
      switchMap(({ id, data }) =>
        resumeService.updateResume(id, data).pipe(
          map(resume => ResumeActions.updateResumeSuccess({ resume })),
          catchError(error => of(ResumeActions.updateResumeFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const loadAllResumes = createEffect(
  (actions$ = inject(Actions),
   resumeService = inject(ResumeService),
   store = inject(Store<{ auth: { authData: any } }>)) =>
    actions$.pipe(
      ofType(ResumeActions.loadAllResumes),
      // Lấy uid inline, không cần selector riêng
      withLatestFrom(store.select(state => state.auth.authData?.uid)),
      switchMap(([_, uid]) => {
        if (!uid) {
          return of(ResumeActions.loadAllResumesFailure({ error: 'No UID present' }));
        }
        return resumeService.getAllByUser(uid).pipe(
          map(resumes => ResumeActions.loadAllResumesSuccess({ resumes })),
          catchError(error => of(ResumeActions.loadAllResumesFailure({ error })))
        );
      })
    ),
  { functional: true }
);

export const createResumeEffect = createEffect(
  (actions$ = inject(Actions),
   resumeService = inject(ResumeService)) =>
    actions$.pipe(
      ofType(ResumeActions.createResume),
      switchMap(({ payload }) =>
        // gọi thẳng service.createResume(payload)
        resumeService.createResume(payload).pipe(
          map(resume => ResumeActions.createResumeSuccess({ resume })),
          catchError(error => of(ResumeActions.createResumeFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const createResumeSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(ResumeActions.createResumeSuccess),
      tap(({ resume }) => {
        // lưu resume_id & redirect
        localStorage.setItem('resume_id', resume.id!);
        router.navigate(['/content']);
      })
    ),
  { functional: true, dispatch: false }
);
export const loadMyResumesEffect = createEffect(
  (actions$ = inject(Actions),
   authService = inject(AuthService),
   resumeService = inject(ResumeService)) =>
    actions$.pipe(
      ofType(ResumeActions.loadAllResumes),

      // 1) Lấy Firebase User, chỉ tiếp nếu có user
      switchMap(() => authService.getCurrentUser().pipe(
        take(1),
        filter(user => !!user),          // Bỏ qua nếu null
        switchMap(user => from(user!.getIdToken()))
      )),

      // 2) Verify token, lấy AuthModel.uid
      switchMap((idToken: string) =>
        authService.getAuth(idToken).pipe(
          take(1),
          map(authModel => authModel.uid!),
          filter(uid => !!uid)            // Bỏ qua nếu uid null
        )
      ),

      // 3) Fetch resumes với uid
      switchMap((uid: string) =>
        resumeService.getMyResumes(uid).pipe(
          map(resumes => ResumeActions.loadAllResumesSuccess({ resumes })),
          catchError(error => of(ResumeActions.loadAllResumesFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const deleteResumeEffect = createEffect(
  (actions$ = inject(Actions), resumeService = inject(ResumeService)) => {
    return actions$.pipe(
      ofType(ResumeActions.deleteResume),
      switchMap(({ id }) =>
        resumeService.deleteResume(id).pipe(
          map(() => ResumeActions.deleteResumeSuccess({ id })),
          catchError(error => of(ResumeActions.deleteResumeFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);


export const loadResumeLinksEffect = createEffect(
  (actions$ = inject(Actions), resumeService = inject(ResumeService)) => {
    return actions$.pipe(
      ofType(ResumeActions.loadLinks),
      switchMap(({ resumeId }) =>
        resumeService.getResumeLinks(resumeId).pipe(
          map(links => ResumeActions.loadLinksSuccess({ links })),
          catchError(error => of(ResumeActions.loadResumeFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
