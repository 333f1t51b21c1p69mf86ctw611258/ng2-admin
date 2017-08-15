import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//
import { App } from './app.component';
import { AuthGuard } from "app/_guards";

export const routes: Routes = [
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages/dashboard' },

  { path: '', component: App, canActivate: [AuthGuard] },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
