import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ClassesComponent } from './classes.component';
import { CalendarModule } from '@commonComponents/calendar/calendar.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserCardModule } from '@commonComponents/user-card/user-card.module';
import { FormsModule } from '@angular/forms';
import { NotesComponent } from '../notes/notes.component';

@NgModule({
  declarations: [ClassesComponent, NotesComponent],
  exports: [ClassesComponent],
  imports: [
    CommonModule,
    IonicModule,
    CalendarModule,
    TranslateModule,
    UserCardModule,
    FormsModule,
  ],
})
export class ClassesModule {}
