import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from '@authModule/pages/login/login.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '@authModule/shared.module';
import { LoginPageRoutingModule } from '@authModule/login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [LoginPage],
  providers: [TranslateService],
})
export class LoginPageModule {}
