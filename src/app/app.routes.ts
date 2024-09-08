import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CallsPageComponent } from './pages/calls-page/calls-page.component';

export const routes: Routes = [
  { path: '', component: RegistrationPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'calls', component: CallsPageComponent },
];
