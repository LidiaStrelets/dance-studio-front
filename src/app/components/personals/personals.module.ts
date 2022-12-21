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
import { TransformDatePipe } from './pipes/transform-date.pipe';
import { InfoButtonModule } from '@commonComponents/info-button/info-button.module';
import { ClassDetailsComponent } from './components/class-details/class-details.component';
import { InfoHeaderModule } from '@commonComponents/info-header/info-header.module';

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
    InfoButtonModule,
    InfoHeaderModule,
  ],
  declarations: [
    PersonalsPage,
    EnrollComponent,
    PaymentComponent,
    TransformDatePipe,
    ClassDetailsComponent,
  ],
  providers: [TransformDatePipe],
})
export class PersonalsPageModule {}
