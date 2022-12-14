import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleItemComponent } from './schedule-item.component';
import { IonicModule } from '@ionic/angular';
import { ItemButtonsComponent } from '@schedulesModule/components/item-buttons/item-buttons.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ScheduleItemComponent, ItemButtonsComponent],
  exports: [ScheduleItemComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class ScheduleItemModule {}
