import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SchedulePageRoutingModule } from '@schedulesModule/schedule-routing.module';
import { SwiperModule } from 'swiper/angular';
import { SchedulePage } from '@schedulesModule/schedule.page';
import { HeaderModule } from '@commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { DateScheduleComponent } from '@schedulesModule/components/date-schedule/date-schedule.component';
import { CoachScheduleComponent } from '@schedulesModule/components/coach-schedule/coach-schedule.component';
import { ClassScheduleComponent } from '@schedulesModule/components/class-schedule/class-schedule.component';
import { InfoModalComponent } from '@schedulesModule/components/info-modal/info-modal.component';
import { CalendarModule } from '@commonComponents/calendar/calendar.module';
import { ScheduleItemModule } from '@commonComponents/schedule-item/schedule-item.module';
import { UserCardModule } from '@commonComponents/user-card/user-card.module';
import { ItemButtonsComponent } from './components/item-buttons/item-buttons.component';
import { FilterClassSchedulePipe } from './pipes/filter-class-schedule.pipe';
import { FilterCoachSchedulePipe } from './pipes/filter-coach-schedule.pipe';
import { PipesModule } from '@app/pipes/pipes.module';
import { InfoButtonModule } from '@commonComponents/info-button/info-button.module';

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
    ScheduleItemModule,
    UserCardModule,
    PipesModule,
    InfoButtonModule,
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
  ],
})
export class SchedulePageModule {}
