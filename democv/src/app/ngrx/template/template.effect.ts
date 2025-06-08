import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadTemplates,
  loadTemplatesSuccess,
  createTemplate,
  createTemplateSuccess,
  deleteTemplate,
  deleteTemplateSuccess, loadTemplatesFailure, createTemplateFailure, deleteTemplateFailure,
} from './template.action';
import { TemplateService } from '../../services/template/template.service';
import { switchMap, map, catchError, of } from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

export const loadTemplatesEffect = createEffect(
  (
    actions$ = inject(Actions),
    templateService = inject(TemplateService)
  ) => actions$.pipe(
    ofType(loadTemplates),
    switchMap(() =>
      templateService.getAll().pipe(  // Không cần uid nữa, middleware đã xử lý
        map((templates) => loadTemplatesSuccess({ templates })),
        catchError((error) => of(loadTemplatesFailure({ error })))
      )
    )
  ),
  { functional: true }
);

export const createTemplateEffect = createEffect(
  (
    actions$ = inject(Actions),
    templateService = inject(TemplateService)
  ) => actions$.pipe(
    ofType(createTemplate),
    switchMap(() =>
      templateService.create().pipe(  // Không cần uid nữa, server đã xử lý
        map((response) => createTemplateSuccess({ template: response })),
        catchError((error) => of(createTemplateFailure({ error })))
      )
    )
  ),
  { functional: true }
);


// src/ngrx/template/template.effect.ts

export const deleteTemplateEffect = createEffect(
  (
    actions$ = inject(Actions),
    templateService = inject(TemplateService)
  ) => actions$.pipe(
    ofType(deleteTemplate),
    switchMap(({ id, uid }) =>
      templateService.delete(id).pipe(
        map(() => deleteTemplateSuccess({ id })),
        catchError((error) => of(deleteTemplateFailure({ error })))
      )
    )
  ),
  { functional: true }
);
