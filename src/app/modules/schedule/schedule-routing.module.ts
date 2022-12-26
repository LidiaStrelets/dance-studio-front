import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoModalComponent } from '@schedulesModule/components/info-modal/info-modal.component';
import { SchedulePage } from '@schedulesModule/pages/schedules/schedule.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage,
  },
  {
    path: ':id',
    component: InfoModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePageRoutingModule {}
