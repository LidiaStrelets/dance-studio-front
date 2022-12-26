import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterPageRoutingModule } from '@authModule/register-routing.module';
import { RegisterPage } from '@authModule/pages/register/register.page';
import { SharedModule } from '@authModule/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
