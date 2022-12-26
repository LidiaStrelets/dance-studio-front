import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserPageRoutingModule } from '@userModule/user-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IconButtonComponent } from '@userModule/components/icon-button/icon-button.component';
import { AvatarComponent } from '@userModule/components/avatar/avatar.component';
import { FormatDatePipe } from '@pipes/format-date.pipe';
import { UserPage } from '@userModule/pages/user/user.page';
import { CommonComponentsModule } from '@app/common/common-components.module';
import { SharedModule } from '@authModule/shared.module';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    CommonComponentsModule,
    PipesModule,
  ],
  declarations: [UserPage, IconButtonComponent, AvatarComponent],
  providers: [FormatDatePipe],
})
export class UserPageModule {}
