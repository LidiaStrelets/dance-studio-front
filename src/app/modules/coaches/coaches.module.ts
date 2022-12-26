import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoachesPageRoutingModule } from '@coachesModule/coaches-routing.module';
import { CoachesPage } from '@coachesModule/pages/coaches/coaches.page';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { CommonComponentsModule } from '@app/common/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachesPageRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    SwiperModule,
  ],
  declarations: [CoachesPage],
})
export class CoachesPageModule {}
