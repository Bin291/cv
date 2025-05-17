import {inject} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AddContentActions from './add-content.action';
import { AddContentService } from '../../services/add-content/add-content.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


export const loadAddContents = createEffect(
  (actions$ = inject(Actions), addContentService = inject(AddContentService)) => {
    return actions$.pipe(
      ofType(AddContentActions.loadAddContents),
      switchMap(() =>
        addContentService.getAll().pipe(
          map((addContents) => {
            // console.log('✅ [Effect] loadAddContents - Success:', addContents);
            return AddContentActions.loadAddContentsSuccess({ addContents:addContents });
          }),
          catchError((error) => {
            // console.error('❌ [Effect] loadAddContents - Error:', error);
            return of(AddContentActions.loadAddContentsFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
