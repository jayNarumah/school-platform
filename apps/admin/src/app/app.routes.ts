import { Route } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';

export const appRoutes: Route[] = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // { path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/pages/notfound' },

];
