import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalaryPageRoutingModule } from '@salaryModule/salary-routing.module';
import { SalaryPage } from '@salaryModule/pages/salary/salary.page';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '@app/common/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaryPageRoutingModule,
    TranslateModule,
    CommonComponentsModule,
  ],
  declarations: [SalaryPage],
})
export class SalaryPageModule {}
