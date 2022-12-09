import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MessagesComponent } from '@commonComponents/messages/messages.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MessagesComponent],
  exports: [MessagesComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class MessagesModule {}
