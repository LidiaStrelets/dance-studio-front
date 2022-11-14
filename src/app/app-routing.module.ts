import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@authModule/guards/auth.guard';
import { IsCoachGuard } from '@authModule/guards/isCoach.guard';

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
  personals: 'personals',
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
      import('@authModule/components/welcome/welcome.module').then(
        (m) => m.WelcomePageModule
      ),
  },
  {
    path: routesPaths.register,
    loadChildren: () =>
      import('@authModule/components/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: routesPaths.login,
    loadChildren: () =>
      import('@authModule/components/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: routesPaths.home,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@homeModule/home.module').then((m) => m.HomePageModule),
  },
  {
    path: routesPaths.user,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@userModule/user.module').then((m) => m.UserPageModule),
  },
  {
    path: routesPaths.schedule,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@schedulesModule/schedule.module').then(
        (m) => m.SchedulePageModule
      ),
  },
  {
    path: routesPaths.classes,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@classesModule/classes.module').then((m) => m.ClassesPageModule),
  },
  {
    path: routesPaths.enrollments,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@enrollmentsModule/enrollments.module').then(
        (m) => m.EnrollmentsPageModule
      ),
  },
  {
    path: routesPaths.coaches,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@coachesModule/coaches.module').then((m) => m.CoachesPageModule),
  },
  {
    path: routesPaths.prices,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@pricesModule/prices.module').then((m) => m.PricesPageModule),
  },
  {
    path: routesPaths.payments,
    canActivate: [AuthGuard, IsCoachGuard],
    loadChildren: () =>
      import('@paymentsModule/payments.module').then(
        (m) => m.PaymentsPageModule
      ),
  },
  {
    path: routesPaths.personals,
    loadChildren: () =>
      import('@personalsModule/personals.module').then(
        (m) => m.PersonalsPageModule
      ),
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
