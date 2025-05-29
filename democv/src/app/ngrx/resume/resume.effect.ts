import { createEffect, ofType, Actions } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as ResumeActions from './resume.action';
import { ResumeService } from '../../services/resume/resume.service';
import { catchError, map, of, switchMap } from 'rxjs';

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
