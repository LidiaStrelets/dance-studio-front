import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from '@homeModule/home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HomePage } from '@homeModule/pages/home/home.page';
import { LanguagesComponent } from '@homeModule/components/languages/languages.component';
import { CommonComponentsModule } from '@app/common/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule,
    CommonComponentsModule,
  ],
  declarations: [HomePage, LanguagesComponent],
})
export class HomePageModule {}
