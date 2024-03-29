import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrollmentsPage } from '@enrollmentsModule/pages/enrollments/enrollments.page';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrollmentsPageRoutingModule {}
