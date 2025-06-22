import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.homeRoutes),
  },
  {
    path:'remuse',
    loadChildren: () => import('./pages/remuse/remuse.routes').then(m => m.remuseRoutes),
  },
  {
    path:'review',
    loadChildren: () => import('./pages/review/review.routes').then(m => m.reviewRoutes),
  },
  {
    path:'upload',
    loadChildren: () => import('./pages/upload/upload.routes').then(m => m.uploadRoutes),
  },
  {
    path:'content',
    loadChildren: () => import('./pages/content/content.routes').then(m => m.contentRoutes),
  },
  {
    path:'customize',
    loadChildren: () => import('./pages/customize/customize.routes').then(m => m.customizeRoutes),
  },
  {
    path:'cv-print',
    loadChildren: () => import('./components/cv-print/cv-print.routes').then(m => m.CvPrintRoutes),
  }
];
