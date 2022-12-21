import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoHeaderComponent } from './info-header.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [InfoHeaderComponent],
  exports: [InfoHeaderComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class InfoHeaderModule {}
