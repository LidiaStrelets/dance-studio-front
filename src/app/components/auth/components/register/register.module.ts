import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from '@authModule/components/register/register-routing.module';
import { RegisterPage } from '@authModule/components/register/register.page';
import { HeaderModule } from '@authModule/components/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorsModule } from '@authModule/components/errors/errors.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    HeaderModule,
    ErrorsModule,
    TranslateModule,
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
