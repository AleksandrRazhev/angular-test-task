import { Routes } from '@angular/router';

import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', component: RegistrationPageComponent },
  {
    path: 'main',
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then(
        (module) => module.MainPageComponent
      ),
    data: { preload: true },
    canActivate: [AuthGuardService],
  },
  {
    path: 'calls',
    loadComponent: () =>
      import('./pages/calls-page/calls-page.component').then(
        (module) => module.CallsPageComponent
      ),
    data: { preload: true },
    canActivate: [AuthGuardService],
  },
];
