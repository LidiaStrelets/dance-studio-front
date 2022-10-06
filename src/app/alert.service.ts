import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertCtrl: AlertController) {}

  async presentAlertConfirm(message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
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
}
