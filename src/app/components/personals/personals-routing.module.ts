import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalsPage } from '@personalsModule/personals.page';
import { EnrollComponent } from '@personalsModule/components/enroll/enroll.component';

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
