import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/guards/auth.guard';

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
  enrollments: 'enrollments',
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
      import('./components/auth/components/welcome/welcome.module').then(
        (m) => m.WelcomePageModule
      ),
  },
  {
    path: routesPaths.register,
    loadChildren: () =>
      import('./components/auth/components/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: routesPaths.login,
    loadChildren: () =>
      import('./components/auth/components/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: routesPaths.home,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: routesPaths.user,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserPageModule),
  },
  {
    path: routesPaths.schedule,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/schedule/schedule.module').then(
        (m) => m.SchedulePageModule
      ),
  },
  {
    path: routesPaths.classes,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/classes/classes.module').then(
        (m) => m.ClassesPageModule
      ),
  },
  {
    path: 'enrollments',
    loadChildren: () => import('./components/enrollments/enrollments.module').then( m => m.EnrollmentsPageModule)
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
