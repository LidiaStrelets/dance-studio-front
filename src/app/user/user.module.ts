import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { UserPage } from './user.page';
import { ErrorsModule } from '../auth/errors/errors.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ErrorsModule,
  ],
  declarations: [UserPage],
})
export class UserPageModule {}
