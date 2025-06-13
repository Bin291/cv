// src/app/ngrx/link/link.effects.ts
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as LinkActions from './link.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {inject} from '@angular/core';
import {LinkTypeService} from '../../services/link-type/link-type.service';

export const loadLinks = createEffect(
  (actions$ = inject(Actions), linkService = inject(LinkTypeService)) => {
    return actions$.pipe(
      ofType(LinkActions.loadLinks),
      switchMap(({ resumeId }) =>
        linkService.loadAll(resumeId).pipe(
          map(links => LinkActions.loadLinksSuccess({ links })),
          catchError(error => of(LinkActions.loadLinksFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const addLink = createEffect(
  (actions$ = inject(Actions), linkService = inject(LinkTypeService)) => {
    return actions$.pipe(
      ofType(LinkActions.addLink),
      switchMap(({ link }) =>
        linkService.create(link).pipe(
          map(newLink => LinkActions.addLinkSuccess({ link: newLink })),
          catchError(error => of(LinkActions.addLinkFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const updateLink = createEffect(
  (actions$ = inject(Actions), linkService = inject(LinkTypeService)) => {
    return actions$.pipe(
      ofType(LinkActions.updateLink),
      switchMap(({ id, changes }) =>
        linkService.update(id, changes).pipe(
          map(updated => LinkActions.updateLinkSuccess({ link: updated })),
          catchError(error => of(LinkActions.updateLinkFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const deleteLink = createEffect(
  (actions$ = inject(Actions), linkService = inject(LinkTypeService)) => {
    return actions$.pipe(
      ofType(LinkActions.deleteLink),
      switchMap(({ id }) =>
        linkService.remove(id).pipe(
          map(() => LinkActions.deleteLinkSuccess({ id })),
          catchError(error => of(LinkActions.deleteLinkFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
