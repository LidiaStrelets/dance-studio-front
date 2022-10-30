import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';
import { SwiperModule } from 'swiper/angular';
import { SchedulePage } from './schedule.page';
import { HeaderModule } from '../commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { DateScheduleComponent } from './components/date-schedule/date-schedule.component';
import { CoachScheduleComponent } from './components/coach-schedule/coach-schedule.component';
import { ClassScheduleComponent } from './components/class-schedule/class-schedule.component';
import { ItemButtonsComponent } from './components/item-buttons/item-buttons.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { EnrolledClientComponent } from './components/enrolled-client/enrolled-client.component';
import { CalendarModule } from '../commonComponents/calendar/calendar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    HeaderModule,
    TranslateModule,
    SwiperModule,
    CalendarModule,
  ],
  declarations: [
    SchedulePage,
    DateScheduleComponent,
    CoachScheduleComponent,
    ClassScheduleComponent,
    ItemButtonsComponent,
    InfoModalComponent,
    EnrolledClientComponent,
  ],
})
export class SchedulePageModule {}
