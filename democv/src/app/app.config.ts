import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp({
      projectId: "buildcv-7b9eb",
      appId: "1:670846951687:web:59886807fc46e2523e65a2",
      storageBucket: "buildcv-7b9eb.firebasestorage.app",
      apiKey: "AIzaSyAaOTfCwElFMZoY8avhM4dlg7FNg7Fr_ic",
      authDomain: "buildcv-7b9eb.firebaseapp.com",
      messagingSenderId: "670846951687",
      measurementId: "G-Q2BVWZ1M37" })),
    provideAuth(() => getAuth())]
};
