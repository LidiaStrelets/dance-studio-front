import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {
  AlertTranslation,
  AreYouSureHandler,
  ConfirmAlertHandler,
  EAlertTranslation,
} from '@app/common/types/types';
import { routesPaths } from '@app/app-routing.module';
import { CreatePersonal } from '@personalsModule/types/types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private translations: AlertTranslation = {} as AlertTranslation;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private translate: TranslateService
  ) {}

  public getTranslations() {
    Object.values(EAlertTranslation).forEach((value) => {
      this.translate
        .get(`alert.${value}`)
        .subscribe((res) => (this.translations[value] = res));
    });

    return this.translations;
  }

  public async presentAlertError(message: string) {
    const alert = await this.alertCtrl.create({
      header: this.getTranslations().oopsHeader,
      message,
      buttons: [
        {
          text: this.getTranslations().okButton,
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  public async presentAlertSuccess(message: string) {
    const alert = await this.alertCtrl.create({
      header: this.getTranslations().completedHeader,
      message,
      buttons: [
        {
          text: this.getTranslations().okButton,
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  public async presentAlertConfirmData(
    data: string,
    handler: ConfirmAlertHandler
  ) {
    const alert = await this.alertCtrl.create({
      header: this.getTranslations().confirmationHeader,
      message: this.translate.instant('alert.confirmationPersonalMessage', {
        data,
      }),
      buttons: [
        {
          text: this.getTranslations().cancellButton,
          role: 'cancel',
        },
        {
          text: this.getTranslations().okButton,
          handler,
        },
      ],
    });

    await alert.present();
  }

  public async presentAlertUnauthorized() {
    const alert = await this.alertCtrl.create({
      header: this.getTranslations().unauthorizedHeader,
      message: this.getTranslations().unauthorizedMesage,
      buttons: [
        {
          text: this.getTranslations().okButton,
          handler: () => {
            this.router.navigate([routesPaths.login]);
            window.location.reload();
          },
        },
      ],
    });

    await alert.present();
  }

  public async presentAreYouSure(message: string, handler: AreYouSureHandler) {
    const alert = await this.alertCtrl.create({
      header: this.getTranslations().confirmationHeader,
      message,
      buttons: [
        {
          text: this.getTranslations().cancellButton,
          role: 'cancel',
        },
        {
          text: this.getTranslations().okButton,
          handler,
        },
      ],
    });

    await alert.present();
  }
}
