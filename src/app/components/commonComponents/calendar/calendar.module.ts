import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, IonicModule],
})
export class CalendarModule {}
