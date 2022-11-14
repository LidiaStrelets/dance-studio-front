import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from '@authModule/components/errors/errors.component';

@NgModule({
  declarations: [ErrorsComponent],
  imports: [CommonModule],
  exports: [ErrorsComponent],
})
export class ErrorsModule {}
