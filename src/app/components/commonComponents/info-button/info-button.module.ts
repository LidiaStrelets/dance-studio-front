import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoButtonComponent } from './info-button.component';

@NgModule({
  declarations: [InfoButtonComponent],
  exports: [InfoButtonComponent],
  imports: [CommonModule],
})
export class InfoButtonModule {}
