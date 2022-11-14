import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PricesPageRoutingModule } from '@pricesModule/prices-routing.module';
import { PricesPage } from '@pricesModule/prices.page';
import { HeaderModule } from '@commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PricesPageRoutingModule,
    HeaderModule,
    TranslateModule,
  ],
  declarations: [PricesPage],
})
export class PricesPageModule {}
