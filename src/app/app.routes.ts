import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing-page.component').then((m) => m.LandingPageComponent)
  },
  {
    path: 'patient',
    loadComponent: () => import('./features/patient/request-form/request-form.component').then((m) => m.RequestFormComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
