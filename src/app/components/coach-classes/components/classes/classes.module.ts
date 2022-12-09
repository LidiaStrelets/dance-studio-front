import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ClassesComponent } from './classes.component';
import { CalendarModule } from '@commonComponents/calendar/calendar.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserCardModule } from '@commonComponents/user-card/user-card.module';
import { FormsModule } from '@angular/forms';
import { NotesComponent } from '../notes/notes.component';
import { StatusCreatedComponent } from '../status-created/status-created.component';
import { PickHallComponent } from '../pick-hall/pick-hall.component';
import { MessagesModule } from '@commonComponents/messages/messages.module';

@NgModule({
  declarations: [
    ClassesComponent,
    NotesComponent,
    StatusCreatedComponent,
    PickHallComponent,
  ],
  exports: [ClassesComponent],
  imports: [
    CommonModule,
    IonicModule,
    CalendarModule,
    TranslateModule,
    UserCardModule,
    FormsModule,
    MessagesModule,
  ],
})
export class ClassesModule {}
