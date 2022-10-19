import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { UserPage } from './user.page';
import { ErrorsModule } from '../auth/components/errors/errors.module';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { HeaderModule } from '../commonComponents/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ErrorsModule,
    HeaderModule,
  ],
  declarations: [UserPage, IconButtonComponent, AvatarComponent],
})
export class UserPageModule {}
