import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routesPaths } from '@app/app-routing.module';
import { CoachClass, EClassTypes } from '@coachClassesModule/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { TranslateService } from '@ngx-translate/core';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Statuses } from '@personalsModule/types';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { LoaderService } from '@services/loader.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalInfoComponent implements OnInit {
  item?: CoachClass;

  pickedHall = '';
  statuses = Statuses;

  rootPath = routesPaths.coachClasses;

  constructor(
    private route: ActivatedRoute,
    private loader: LoaderService,
    private personalsService: PersonalsService,
    private changes: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private schedulesService: SchedulesService,
    private enrollmentsService: EnrollmentsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      const scheduleId = res.get('id');
      const itemType = res.get('type');
      if (scheduleId) {
        if (itemType === 'personal') {
          this.loader.showSpinner();
          this.personalsService.get(scheduleId)?.subscribe({
            next: (res) => {
              this.item = this.personalsService.addType(res[0]);
              this.loader.hideSpinner();
              this.changes.markForCheck();
            },
            error: (err) => {
              catchError(err);
              this.loader.hideSpinner();
            },
          });
        }
        if (itemType === 'group') {
          this.schedulesService.getById(scheduleId)?.subscribe({
            next: (res) => {
              this.item = this.personalsService.addType({
                ...res,
                status: Statuses.created,
                client_id: '',
              });
              this.enrollmentsService.getBySchedule(scheduleId)?.subscribe({
                next: (res) => {
                  this.item!.clients = res.map(({ client_id }) => client_id);
                  this.changes.markForCheck();
                  this.loader.hideSpinner();
                },
                error: (err) => {
                  catchError(err);
                  this.loader.hideSpinner();
                },
              });
            },
            error: (err) => {
              catchError(err);
            },
          });
        }
      }
    });
  }

  getClients = (item: CoachClass) => item.clients;

  status = (item: CoachClass) => {
    if (item.type === EClassTypes.personal) {
      return item.status;
    } else {
      if (!item.clients || item.clients.length < 3) {
        return 'no-group';
      } else return '';
    }
  };

  statusMessage = (item: CoachClass) => {
    const status = this.status(item);
    return this.translate.instant(`coachClasses.status.${status}`);
  };

  setHall = (hallId: string) => {
    this.pickedHall = hallId;
  };

  back = () => {
    this.router.navigate([routesPaths.coachClasses]);
  };
}
