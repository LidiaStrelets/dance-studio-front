import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentsPageRoutingModule } from '@paymentsModule/payments-routing.module';
import { PaymentsPage } from '@paymentsModule/payments.page';
import { HeaderModule } from '@commonComponents/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { GetExpirationDatePipe } from './pipes/get-expiration-date.pipe';
import { PipesModule } from '@app/pipes/pipes.module';
import { FilterExpiredPipe } from './pipes/filter-expired.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsPageRoutingModule,
    HeaderModule,
    TranslateModule,
    PipesModule,
  ],
  declarations: [PaymentsPage, GetExpirationDatePipe, FilterExpiredPipe],
})
export class PaymentsPageModule {}
