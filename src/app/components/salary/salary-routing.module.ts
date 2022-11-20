import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalaryPage } from '@salaryModule/salary.page';

const routes: Routes = [
  {
    path: '',
    component: SalaryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryPageRoutingModule {}
