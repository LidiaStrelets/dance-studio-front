import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoachesPageRoutingModule } from '@coachesModule/coaches-routing.module';
import { CoachesPage } from '@coachesModule/coaches.page';
import { HeaderModule } from '@commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachesPageRoutingModule,
    HeaderModule,
    TranslateModule,
    SwiperModule,
  ],
  declarations: [CoachesPage],
})
export class CoachesPageModule {}
