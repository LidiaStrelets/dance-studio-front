import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoachClassesPageRoutingModule } from '@coachClassesModule/coach-classes-routing.module';
import { CoachClassesPage } from '@coachClassesModule/pages/classes/coach-classes.page';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '@pipes/pipes.module';
import { FormatDatePipe } from '@pipes/format-date.pipe';
import { CommonComponentsModule } from '@app/common/common-components.module';
import { ClassesModule } from '@coachClassesModule/components/classes/classes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachClassesPageRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    SwiperModule,
    ClassesModule,
    PipesModule,
  ],
  declarations: [CoachClassesPage],
  providers: [FormatDatePipe],
})
export class CoachClassesPageModule {}
