import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {StyleService} from '../../services/style/style.service';
import * as StyleActions from './style.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';

export const loadStyle = createEffect(
  (actions$ = inject(Actions), styleService = inject(StyleService)) => {
    return actions$.pipe(
      ofType(StyleActions.loadStyle),
      switchMap(({ resumeId }) =>
        styleService.loadStyle(resumeId).pipe(
          map(res => StyleActions.loadStyleSuccess({ style: res.style })),
          catchError(error => of(StyleActions.loadStyleFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const updateStyle = createEffect(
  (actions$ = inject(Actions), styleService = inject(StyleService)) => {
    return actions$.pipe(
      ofType(StyleActions.updateStyle),
      switchMap(({ resumeId, patch }) =>
        styleService.saveStyle(resumeId, patch).pipe(
          tap(() => styleService.emitLocalStyle(patch)), // emit patch
          map(() => StyleActions.loadStyle({ resumeId })),
          catchError(error => of(StyleActions.loadStyleFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

