import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormatDatePipe } from '@app/common/pipes/format-date.pipe';
import { CoachClass } from '@coachClassesModule/types/types';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Statuses } from '@personalsModule/types/types';
import { LoaderService } from '@services/loader.service';
import { SocketService } from '@services/socket.service';
import { UsersService } from '@userModule/services/users.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-status-created',
  templateUrl: './status-created.component.html',
  styleUrls: ['./status-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusCreatedComponent implements OnInit {
  @Input()
  item?: CoachClass;
  @Input()
  hallId = '';

  private client = '';

  constructor(
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private usersService: UsersService,
    private personalsService: PersonalsService,
    private socketService: SocketService,
    private formatDate: FormatDatePipe,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    if (this.item?.clients) {
      this.loader.showSpinner();
      this.usersService.getById(this.item.clients[0])?.subscribe({
        next: (res) => {
          this.client = this.usersService.getUserName(res);
          this.loader.hideSpinner();
        },
        error: (err) => {
          catchError(err);
          this.loader.hideSpinner();
        },
      });
    }
  }

  public async presentAlertApprove() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('coachClasses.alert.approveHeader'),
      message: this.translate.instant('coachClasses.alert.approveText', {
        classData: `${this.client}, ${this.item?.['class']}, ${
          this.item?.['date_time']
            ? this.formatDate.transform(this.item?.['date_time'], 'date-time')
            : ''
        }, ${this.item?.['duration']} ${this.translate.instant(
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
  public async presentAlertCancell() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('coachClasses.alert.cancellHeader'),
      message: this.translate.instant('coachClasses.alert.cancellText', {
        classData: ``,
      }),
      buttons: [
        {
          text: this.translate.instant('buttons.ok'),
          handler: () => {
            if (!this.item?.['id']) {
              return;
            }
            this.loader.showSpinner();
            this.personalsService
              .update({ status: Statuses.cancelled }, this.item?.['id'])
              ?.subscribe({
                next: (res) => {
                  this.socketService.emitPersonal(res);
                  this.loader.hideSpinner();
                },
                error: (err) => {
                  catchError(err);
                  this.loader.hideSpinner();
                },
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
  public async presentAlertDetails() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('coachClasses.alert.messageHeader'),
      buttons: [
        {
          text: this.translate.instant('buttons.ok'),
          handler: (alertData) => {
            if (!this.item?.['id']) {
              return;
            }
            const newMessage = alertData['message'];
            this.loader.showSpinner();
            this.personalsService
              .update(
                {
                  status: Statuses.approved,
                  message: newMessage,
                  hall_id: this.hallId,
                },
                this.item?.['id']
              )
              ?.subscribe({
                next: (res) => {
                  this.socketService.emitPersonal(res);
                  if (newMessage && this.item?.['id']) {
                    this.socketService.emitMessage({
                      message: newMessage,
                      personal_id: this.item?.['id'],
                    });
                  }
                  this.loader.hideSpinner();
                },
                error: (err) => {
                  catchError(err);
                  this.loader.hideSpinner();
                },
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
