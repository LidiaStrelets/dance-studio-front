import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalaryPageRoutingModule } from '@salaryModule/salary-routing.module';
import { SalaryPage } from '@salaryModule/salary.page';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '@commonComponents/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaryPageRoutingModule,
    TranslateModule,
    HeaderModule,
  ],
  declarations: [SalaryPage],
})
export class SalaryPageModule {}
