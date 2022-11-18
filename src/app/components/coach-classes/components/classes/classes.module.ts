import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ClassesComponent } from './classes.component';
import { CalendarModule } from '@commonComponents/calendar/calendar.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserCardModule } from '@commonComponents/user-card/user-card.module';

@NgModule({
  declarations: [ClassesComponent],
  exports: [ClassesComponent],
  imports: [
    CommonModule,
    IonicModule,
    CalendarModule,
    TranslateModule,
    UserCardModule,
  ],
})
export class ClassesModule {}
