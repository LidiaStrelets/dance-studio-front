import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PricesPageRoutingModule } from '@pricesModule/prices-routing.module';
import { PricesPage } from '@pricesModule/pages/prices/prices.page';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '@app/common/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PricesPageRoutingModule,
    CommonComponentsModule,
    TranslateModule,
  ],
  declarations: [PricesPage],
})
export class PricesPageModule {}
