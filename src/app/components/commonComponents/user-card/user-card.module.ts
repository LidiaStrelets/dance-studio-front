import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [UserCardComponent],
  exports: [UserCardComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class UserCardModule {}
