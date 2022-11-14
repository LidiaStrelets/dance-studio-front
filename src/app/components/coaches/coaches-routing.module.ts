import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoachesPage } from '@coachesModule/coaches.page';

const routes: Routes = [
  {
    path: '',
    component: CoachesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachesPageRoutingModule {}
