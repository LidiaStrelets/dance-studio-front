import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleItemComponent } from './schedule-item.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ScheduleItemComponent],
  exports: [ScheduleItemComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class ScheduleItemModule {}
