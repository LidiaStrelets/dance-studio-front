import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalsPage } from '@personalsModule/personals.page';
import { EnrollComponent } from '@personalsModule/components/enroll/enroll.component';
import { ClassDetailsComponent } from './components/class-details/class-details.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalsPage,
  },
  {
    path: 'enroll',
    component: EnrollComponent,
  },
  {
    path: ':id',
    component: ClassDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalsPageRoutingModule {}
