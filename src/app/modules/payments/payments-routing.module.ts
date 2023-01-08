import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsPage } from '@paymentsModule/pages/payments/payments.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsPage,
  },
  {
    path: ':priceId',
    component: PaymentsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsPageRoutingModule {}
