import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentsPageRoutingModule } from '@paymentsModule/payments-routing.module';
import { PaymentsPage } from '@paymentsModule/pages/payments/payments.page';
import { TranslateModule } from '@ngx-translate/core';
import { GetExpirationDatePipe } from '@paymentsModule/pipes/get-expiration-date.pipe';
import { PipesModule } from '@pipes/pipes.module';
import { FilterExpiredPipe } from '@paymentsModule/pipes/filter-expired.pipe';
import { CommonComponentsModule } from '@app/common/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsPageRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    PipesModule,
  ],
  declarations: [PaymentsPage, GetExpirationDatePipe, FilterExpiredPipe],
})
export class PaymentsPageModule {}
