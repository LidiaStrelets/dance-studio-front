import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from '@authModule/components/login/login-routing.module';

import { LoginPage } from '@authModule/components/login/login.page';
import { HeaderModule } from '@authModule/components/header/header.module';
import { ErrorsModule } from '@authModule/components/errors/errors.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HeaderModule,
    ReactiveFormsModule,
    ErrorsModule,
    TranslateModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
