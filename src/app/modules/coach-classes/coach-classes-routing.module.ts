import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachClassesPage } from '@coachClassesModule/pages/classes/coach-classes.page';
import { AdditionalInfoComponent } from '@coachClassesModule/components/additional-info/additional-info.component';

const routes: Routes = [
  {
    path: '',
    component: CoachClassesPage,
  },
  {
    path: ':id/:type',
    component: AdditionalInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachClassesPageRoutingModule {}
