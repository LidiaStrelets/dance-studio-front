import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertTranslation, EAlertTranslation } from 'src/types';
import { routesPaths } from '../app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  translations: AlertTranslation = {} as AlertTranslation;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private translate: TranslateService
  ) {}

  getTranslations = () => {
    Object.values(EAlertTranslation).forEach((value) => {
      this.translate
        .get(`alert.${value}`)
        .subscribe((res) => (this.translations[value] = res));
    });

    return this.translations;
  };

  async presentAlertError(message: string) {
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

  async presentAlertSuccess(message: string) {
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

  async presentAlertUnauthorized() {
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
}
