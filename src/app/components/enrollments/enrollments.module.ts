import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EnrollmentsPageRoutingModule } from '@enrollmentsModule/enrollments-routing.module';
import { EnrollmentsPage } from '@enrollmentsModule/enrollments.page';
import { HeaderModule } from '@commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { CalendarModule } from '@commonComponents/calendar/calendar.module';
import { CurrentComponent } from '@enrollmentsModule/components/current/current.component';
import { StatsComponent } from '@enrollmentsModule/components/stats/stats.component';
import { ScheduleItemModule } from '@commonComponents/schedule-item/schedule-item.module';
import { CancellButtonComponent } from '@commonComponents/cancell-button/cancell-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnrollmentsPageRoutingModule,
    TranslateModule,
    HeaderModule,
    SwiperModule,
    CalendarModule,
    ScheduleItemModule,
  ],
  declarations: [
    CancellButtonComponent,
    EnrollmentsPage,
    CurrentComponent,
    StatsComponent,
  ],
})
export class EnrollmentsPageModule {}
