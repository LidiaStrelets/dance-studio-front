import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollmentsPageRoutingModule } from './enrollments-routing.module';

import { EnrollmentsPage } from './enrollments.page';
import { HeaderModule } from '../commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { CalendarModule } from '../commonComponents/calendar/calendar.module';
import { CurrentComponent } from './components/current/current.component';
import { StatsComponent } from './components/stats/stats.component';

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
  ],
  declarations: [EnrollmentsPage, CurrentComponent, StatsComponent],
})
export class EnrollmentsPageModule {}
