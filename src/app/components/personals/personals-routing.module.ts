import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollComponent } from './components/enroll/enroll.component';

import { PersonalsPage } from './personals.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalsPage,
  },
  {
    path: 'enroll',
    component: EnrollComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalsPageRoutingModule {}
