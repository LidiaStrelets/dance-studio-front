import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonalsPageRoutingModule } from '@personalsModule/personals-routing.module';
import { PersonalsPage } from '@personalsModule/personals.page';
import { HeaderModule } from '@commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { EnrollComponent } from '@personalsModule/components/enroll/enroll.component';
import { CalendarModule } from '@commonComponents/calendar/calendar.module';
import { ErrorsModule } from '@authModule/components/errors/errors.module';
import { ScheduleItemModule } from '@commonComponents/schedule-item/schedule-item.module';
import { MessagesModule } from '@commonComponents/messages/messages.module';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalsPageRoutingModule,
    HeaderModule,
    TranslateModule,
    ReactiveFormsModule,
    CalendarModule,
    ErrorsModule,
    ScheduleItemModule,
    MessagesModule,
  ],
  declarations: [PersonalsPage, EnrollComponent, PaymentComponent],
})
export class PersonalsPageModule {}
