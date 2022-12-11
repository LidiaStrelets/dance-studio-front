import { Component, Input, OnInit } from '@angular/core';
import { CoachClass } from '@coachClassesModule/types';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Statuses } from '@personalsModule/types';
import { DateService } from '@services/date.service';
import { SocketService } from '@services/socket.service';
import { UsersService } from '@userModule/services/users.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-status-created',
  templateUrl: './status-created.component.html',
  styleUrls: ['./status-created.component.scss'],
})
export class StatusCreatedComponent implements OnInit {
  @Input() item?: CoachClass;
  @Input() hallId = '';

  client = '';

  constructor(
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private usersService: UsersService,
    private dateService: DateService,
    private personalsService: PersonalsService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    if (this.item?.clients) {
      this.usersService.getById(this.item.clients[0])?.subscribe({
        next: (res) => {
          this.client = this.usersService.getUserName(res);
        },
        error: catchError,
      });
    }
  }

  async presentAlertApprove() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('coachClasses.alert.approveHeader'),
      message: this.translate.instant('coachClasses.alert.approveText', {
        classData: `${this.client}, ${this.item?.class}, ${
          this.item?.date_time
            ? this.dateService.getDateTime(this.item?.date_time)
            : ''
        }, ${this.item?.duration} ${this.translate.instant(
          'schedule.minutes'
        )}`,
      }),
      buttons: [
        {
          text: this.translate.instant('buttons.ok'),
          handler: async () => {
            alert.dismiss();
            await this.presentAlertDetails();
            return true;
          },
        },
        {
          text: this.translate.instant('buttons.cancel'),
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }
  async presentAlertCancell() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('coachClasses.alert.cancellHeader'),
      message: this.translate.instant('coachClasses.alert.cancellText', {
        classData: ``,
      }),
      buttons: [
        {
          text: this.translate.instant('buttons.ok'),
          handler: () => {
            if (!this.item?.id) {
              return;
            }

            this.personalsService
              .update({ status: Statuses.cancelled }, this.item?.id)
              ?.subscribe({
                next: (res) => {
                  this.socketService.emitPersonal(res);
                },
                error: catchError,
              });
          },
        },
        {
          text: this.translate.instant('buttons.cancel'),
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }
  async presentAlertDetails() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('coachClasses.alert.messageHeader'),
      buttons: [
        {
          text: this.translate.instant('buttons.ok'),
          handler: (alertData) => {
            if (!this.item?.id) {
              return;
            }
            const newMessage = alertData['message'];

            this.personalsService
              .update(
                {
                  status: Statuses.approved,
                  message: newMessage,
                  hall_id: this.hallId,
                },
                this.item?.id
              )
              ?.subscribe({
                next: (res) => {
                  this.socketService.emitPersonal(res);
                  if (newMessage && this.item?.id) {
                    this.socketService.emitMessage({
                      message: newMessage,
                      personal_id: this.item?.id,
                    });
                  }
                },
                error: catchError,
              });
          },
        },
      ],
      inputs: [
        {
          name: 'message',
          type: 'textarea',
          placeholder: this.translate.instant(
            'coachClasses.alert.messagePlaceholder'
          ),
        },
      ],
    });

    await alert.present();
  }
}
