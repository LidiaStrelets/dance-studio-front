import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClassesPageRoutingModule } from '@classesModule/classes-routing.module';
import { ClassesPage } from '@classesModule/pages/classes/classes.page';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '@app/common/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassesPageRoutingModule,
    CommonComponentsModule,
    TranslateModule,
  ],
  declarations: [ClassesPage],
})
export class ClassesPageModule {}
