import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideEffects } from '@ngrx/effects';
import {environment} from './environments/environment';
import {authReducer} from './ngrx/auth/auth.reducers';
import {provideStore} from '@ngrx/store';
import * as AuthEffects from './ngrx/auth/auth.effect';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {addContentReducer} from './ngrx/add-content/add-content.reducer';
import * as AddcontentEffects from './ngrx/add-content/add-content.effect';
import * as ResumeEffects from './ngrx/resume/resume.effect';
import {ResumeState} from './ngrx/resume/resume.state';
import {resumeReducer} from './ngrx/resume/resume.reducer';
import  * as LinkEffects from './ngrx/link/link.effects';
import {linkReducer} from './ngrx/link/link.reducers';
import {styleReducer} from './ngrx/style/style.reducers';
import * as StyleEffects from './ngrx/style/style.effects';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStore({
      auth: authReducer,
      addContent: addContentReducer,
      resume:resumeReducer,
      link: linkReducer,
      style: styleReducer,

    }),


    provideAuth(() => getAuth()),
    provideEffects( AuthEffects, AddcontentEffects , ResumeEffects, LinkEffects, StyleEffects)
  ]
};
