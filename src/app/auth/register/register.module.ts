import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { HeaderComponent } from '../header/header.component';
import { ErrorsComponent } from '../errors/errors.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
  ],
  declarations: [RegisterPage, ErrorsComponent, HeaderComponent],
})
export class RegisterPageModule {}
