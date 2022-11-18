import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoachClassesPageRoutingModule } from '@coachClassesModule/coach-classes-routing.module';
import { CoachClassesPage } from '@coachClassesModule/coach-classes.page';
import { HeaderModule } from '@commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { ClassesModule } from '@coachClassesModule/components/classes/classes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachClassesPageRoutingModule,
    HeaderModule,
    TranslateModule,
    SwiperModule,
    ClassesModule,
  ],
  declarations: [CoachClassesPage],
})
export class CoachClassesPageModule {}
