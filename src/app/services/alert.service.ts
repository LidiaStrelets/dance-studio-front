import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { routesPaths } from '../app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertCtrl: AlertController, private router: Router) {}

  async presentAlertError(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Oops :( Something went wrong',
      message,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  async presentAlertUnauthorized() {
    const alert = await this.alertCtrl.create({
      header: 'Unauthorized!',
      message: 'Your session has expired, please log in',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate([routesPaths.login]);
          },
        },
      ],
    });

    await alert.present();
  }
}
