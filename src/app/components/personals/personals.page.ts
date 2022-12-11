import { Component, OnInit } from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { CoachClass } from '@coachClassesModule/types';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from '@services/date.service';
import { LoaderService } from '@services/loader.service';
import { SocketService } from '@services/socket.service';
import { catchError } from 'rxjs';
import { routesPaths } from 'src/app/app-routing.module';
import { PersonalsService } from './services/personals.service';
import { Personal, Statuses, TStatus } from './types';

@Component({
  selector: 'app-personals',
  templateUrl: './personals.page.html',
  styleUrls: ['./personals.page.scss'],
})
export class PersonalsPage implements OnInit {
  routerPath = routesPaths;

  personals: Personal[] = [];
  coachClasses: CoachClass[] = [];
  statuses = Statuses;

  constructor(
    private loader: LoaderService,
    private personalService: PersonalsService,
    private translate: TranslateService,
    private socketService: SocketService,
    private authService: AuthService,
    private dateService: DateService
  ) {}

  async ngOnInit() {
    this.loader.showSpinner();

    this.personalService.getByUser()?.subscribe({
      next: (res) => {
        this.personals = res;
        this.coachClasses = this.personals.map((item) =>
          this.personalService.addType(item)
        );
      },
      error: catchError,
    });

    this.socketService.subscribeOnPersonal((item: Personal) => {
      if (
        item.client_id !== this.authService.getCurrentUserId() ||
        this.dateService.isOtherDate(
          new Date(item.date_time),
          this.dateService.baseScheduleDate
        )
      ) {
        return;
      }

      const coachClass = this.personalService.addType(item);

      if (this.coachClasses.some((coachClass) => coachClass.id === item.id)) {
        this.coachClasses = this.coachClasses.map((classItem) =>
          classItem.id === item.id ? coachClass : classItem
        );
      } else {
        this.coachClasses = [...this.coachClasses, coachClass];
      }
    });

    this.loader.hideSpinner();
  }

  statusMessage = (status: TStatus) =>
    this.translate.instant(`personals.statuses.${status}`);

  trackMessages(index: number, item: CoachClass) {
    return item.id;
  }
}
