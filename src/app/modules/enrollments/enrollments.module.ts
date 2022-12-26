import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EnrollmentsPageRoutingModule } from '@enrollmentsModule/enrollments-routing.module';
import { EnrollmentsPage } from '@enrollmentsModule/pages/enrollments/enrollments.page';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { CurrentComponent } from '@enrollmentsModule/components/current/current.component';
import { StatsComponent } from '@enrollmentsModule/components/stats/stats.component';
import { PipesModule } from '@pipes/pipes.module';
import { CommonComponentsModule } from '@app/common/common-components.module';
import { ClassIsComingPipe } from './pipes/class-is-coming.pipe';
import { GetTimeLeftPipe } from './pipes/get-time-left.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnrollmentsPageRoutingModule,
    TranslateModule,
    SwiperModule,
    CommonComponentsModule,
    PipesModule,
  ],
  declarations: [
    EnrollmentsPage,
    CurrentComponent,
    StatsComponent,
    ClassIsComingPipe,
    GetTimeLeftPipe,
  ],
  providers: [GetTimeLeftPipe],
})
export class EnrollmentsPageModule {}
