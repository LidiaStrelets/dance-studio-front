import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SchedulePageRoutingModule } from '@schedulesModule/schedule-routing.module';
import { SwiperModule } from 'swiper/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DateScheduleComponent } from '@schedulesModule/components/date-schedule/date-schedule.component';
import { CoachScheduleComponent } from '@schedulesModule/components/coach-schedule/coach-schedule.component';
import { ClassScheduleComponent } from '@schedulesModule/components/class-schedule/class-schedule.component';
import { InfoModalComponent } from '@schedulesModule/components/info-modal/info-modal.component';
import { ItemButtonsComponent } from '@schedulesModule/components/item-buttons/item-buttons.component';
import { FilterClassSchedulePipe } from '@schedulesModule/pipes/filter-class-schedule.pipe';
import { FilterCoachSchedulePipe } from '@schedulesModule/pipes/filter-coach-schedule.pipe';
import { PipesModule } from '@pipes/pipes.module';
import { CommonComponentsModule } from '@app/common/common-components.module';
import { SchedulePage } from '@schedulesModule/pages/schedules/schedule.page';
import { GetWeekDayPipe } from '@schedulesModule/pipes/get-week-day.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    SwiperModule,
    PipesModule,
  ],
  declarations: [
    ItemButtonsComponent,
    SchedulePage,
    DateScheduleComponent,
    CoachScheduleComponent,
    ClassScheduleComponent,
    InfoModalComponent,
    FilterClassSchedulePipe,
    FilterCoachSchedulePipe,
    GetWeekDayPipe,
  ],
  providers: [GetWeekDayPipe],
})
export class SchedulePageModule {}
