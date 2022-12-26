import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonalsPageRoutingModule } from '@personalsModule/personals-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { EnrollComponent } from '@personalsModule/components/enroll/enroll.component';
import { PaymentComponent } from '@personalsModule/components/payment/payment.component';
import { TransformDatePipe } from '@personalsModule/pipes/transform-date.pipe';
import { ClassDetailsComponent } from '@personalsModule/components/class-details/class-details.component';
import { CommonComponentsModule } from '@app/common/common-components.module';
import { SharedModule } from '@authModule/shared.module';
import { PersonalsPage } from '@personalsModule/pages/personals/personals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalsPageRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    PersonalsPage,
    EnrollComponent,
    PaymentComponent,
    TransformDatePipe,
    ClassDetailsComponent,
  ],
  providers: [TransformDatePipe],
})
export class PersonalsPageModule {}
