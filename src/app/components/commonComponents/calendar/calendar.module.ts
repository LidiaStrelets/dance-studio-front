import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    IonicModule,
    PipesModule,
  ],
})
export class CalendarModule {}
