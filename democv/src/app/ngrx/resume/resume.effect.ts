import { createEffect, ofType, Actions } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as ResumeActions from './resume.action';
import { ResumeService } from '../../services/resume/resume.service';
import {catchError, map, mergeMap, of, switchMap, withLatestFrom} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';


// ✅ Effect: Load Resume
export const loadResume = createEffect(
  (actions$ = inject(Actions), resumeService = inject(ResumeService)) => {
    return actions$.pipe(
      ofType(ResumeActions.loadResume),
      switchMap(({ id }) =>
        resumeService.getResume(id).pipe(
          map(resume => ResumeActions.loadResumeSuccess({ resume })),
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
