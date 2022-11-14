import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalsPageRoutingModule } from './personals-routing.module';

import { PersonalsPage } from './personals.page';
import { HeaderModule } from '../commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { EnrollComponent } from './components/enroll/enroll.component';
import { CalendarModule } from '../commonComponents/calendar/calendar.module';
import { ErrorsModule } from '../auth/components/errors/errors.module';

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
  ],
  declarations: [PersonalsPage, EnrollComponent],
})
export class PersonalsPageModule {}
