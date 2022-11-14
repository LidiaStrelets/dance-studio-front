import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from '@homeModule/home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HomePage } from '@homeModule/home.page';
import { LanguagesComponent } from '@homeModule/components/languages/languages.component';
import { HeaderModule } from '@commonComponents/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule,
    HeaderModule,
  ],
  declarations: [HomePage, LanguagesComponent],
})
export class HomePageModule {}
