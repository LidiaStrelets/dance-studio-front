import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SingleSchedule } from '@schedulesModule/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { Registration } from '@enrollmentsModule/types';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  enrollments: Registration[] = [];

  item = new BehaviorSubject<SingleSchedule | undefined>(undefined);

  constructor(
    private languageService: LanguageService,
    private enrollmentsService: EnrollmentsService,
    private loader: LoaderService,
    private location: Location,
    private route: ActivatedRoute,
    private scheduleService: SchedulesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (res) => {
      this.loader.showSpinner();
      const scheduleId = res.get('id');

      if (!scheduleId) {
        // show error
        return;
      }
      this.scheduleService.getById(scheduleId)?.subscribe({
        next: (res) => {
          const translated = this.languageService.translateSingleSchedule(res);

          this.item.next(translated);
        },
        error: catchError,
      });

      this.item.subscribe((res) => {
        if (res) {
          this.enrollmentsService.getBySchedule(res.id)?.subscribe({
            next: (res) => {
              this.enrollments = res;
            },
            error: (err) => {
              catchError(err);
            },
          });
        }
      });

      this.loader.hideSpinner();
    });
  }

  isUk = this.languageService.isUk;

  backToSchedule = () => {
    this.location.back();
  };
}
