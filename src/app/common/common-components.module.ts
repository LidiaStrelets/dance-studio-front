import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@pipes/pipes.module';
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';
import { HeaderComponent } from '@commonComponents/header/header.component';
import { InfoButtonComponent } from '@commonComponents/info-button/info-button.component';
import { InfoHeaderComponent } from '@commonComponents/info-header/info-header.component';
import { MessagesComponent } from '@commonComponents/messages/messages.component';
import { ScheduleItemComponent } from '@commonComponents/schedule-item/schedule-item.component';
import { UserCardComponent } from '@commonComponents/user-card/user-card.component';
import { CancellButtonComponent } from '@commonComponents/cancell-button/cancell-button.component';
import { FormatDatePipe } from '@pipes/format-date.pipe';

@NgModule({
  declarations: [
    CalendarComponent,
    HeaderComponent,
    InfoButtonComponent,
    InfoHeaderComponent,
    MessagesComponent,
    ScheduleItemComponent,
    UserCardComponent,
    CancellButtonComponent,
  ],
  exports: [
    CalendarComponent,
    HeaderComponent,
    InfoButtonComponent,
    InfoHeaderComponent,
    MessagesComponent,
    ScheduleItemComponent,
    UserCardComponent,
    CancellButtonComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  providers: [PipesModule],
})
export class CommonComponentsModule {}
