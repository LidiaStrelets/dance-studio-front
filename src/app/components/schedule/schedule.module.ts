import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';
import { SwiperModule } from 'swiper/angular';
import { SchedulePage } from './schedule.page';
import { HeaderModule } from '../commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { DateScheduleComponent } from './date-schedule/date-schedule.component';
import { CoachScheduleComponent } from './coach-schedule/coach-schedule.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    HeaderModule,
    TranslateModule,
    SwiperModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SchedulePage,
    DateScheduleComponent,
    CoachScheduleComponent,
    ClassScheduleComponent,
  ],
})
export class SchedulePageModule {}
