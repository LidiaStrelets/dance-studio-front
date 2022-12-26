import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ClassesComponent } from './classes.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { StatusCreatedComponent } from '@coachClassesModule/components/status-created/status-created.component';
import { PickHallComponent } from '@coachClassesModule/components/pick-hall/pick-hall.component';
import { ClassesDetailsComponent } from '@coachClassesModule/components/classes-details/classes-details.component';
import { PipesModule } from '@pipes/pipes.module';
import { AdditionalInfoComponent } from '@coachClassesModule/components/additional-info/additional-info.component';
import { CommonComponentsModule } from '@app/common/common-components.module';
import { NotesComponent } from '@coachClassesModule/components/notes/notes.component';

@NgModule({
  declarations: [
    ClassesComponent,
    NotesComponent,
    StatusCreatedComponent,
    PickHallComponent,
    ClassesDetailsComponent,
    AdditionalInfoComponent,
  ],
  exports: [ClassesComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule,
    PipesModule,
    CommonComponentsModule,
  ],
})
export class ClassesModule {}
