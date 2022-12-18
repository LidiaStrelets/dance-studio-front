import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserPageRoutingModule } from '@userModule/user-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserPage } from '@userModule/user.page';
import { ErrorsModule } from '@authModule/components/errors/errors.module';
import { IconButtonComponent } from '@userModule/components/icon-button/icon-button.component';
import { AvatarComponent } from '@userModule/components/avatar/avatar.component';
import { HeaderModule } from '@commonComponents/header/header.module';
import { FormatDatePipe } from '@app/pipes/format-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ErrorsModule,
    HeaderModule,
  ],
  declarations: [UserPage, IconButtonComponent, AvatarComponent],
  providers: [FormatDatePipe],
})
export class UserPageModule {}
