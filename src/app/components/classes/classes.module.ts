import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassesPageRoutingModule } from './classes-routing.module';

import { ClassesPage } from './classes.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '../commonComponents/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassesPageRoutingModule,
    HeaderModule,
    TranslateModule,
  ],
  declarations: [ClassesPage],
})
export class ClassesPageModule {}
