import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routesPaths = {
  default: 'welcome',
  register: 'register',
  login: 'login',
  home: 'home',
  user: 'user',
  schedule: 'schedule',
  payments: 'payments',
  coaches: 'coaches',
  classes: 'classes',
  prices: 'prices',
};

const routes: Routes = [
  {
    path: '',
    redirectTo: routesPaths.default,
    pathMatch: 'full',
  },
  {
    path: routesPaths.default,
    loadChildren: () =>
      import('./auth/welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  {
    path: routesPaths.register,
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: routesPaths.login,
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: routesPaths.home,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: routesPaths.user,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserPageModule),
  },
  {
    path: routesPaths.schedule,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.SchedulePageModule),
  },
  // {
  //   path: '**',
  //   redirectTo: 'welcome',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
