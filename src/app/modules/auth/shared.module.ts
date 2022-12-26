import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from '@authModule/components/errors/errors.component';
import { AuthHeaderComponent } from '@authModule/components/auth-header/auth-header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ErrorsComponent, AuthHeaderComponent],
  exports: [ErrorsComponent, AuthHeaderComponent],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class SharedModule {}
