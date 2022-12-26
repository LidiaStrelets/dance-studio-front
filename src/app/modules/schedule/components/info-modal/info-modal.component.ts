import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { TrainingWithInfo } from '@schedulesModule/types/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { Registration } from '@enrollmentsModule/types/types';
import { routesPaths } from '@app/app-routing.module';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public enrollments: Registration[] = [];
  public item = new BehaviorSubject<TrainingWithInfo | undefined>(undefined);

  constructor(
    private languageService: LanguageService,
    private enrollmentsService: EnrollmentsService,
    private loader: LoaderService,
    private location: Location,
    private route: ActivatedRoute,
    private scheduleService: SchedulesService,
    private router: Router,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const subscriptionParam = this.route.paramMap.subscribe((res) => {
      const scheduleId = res.get('id');

      if (!scheduleId) {
        this.router.navigate([routesPaths.schedule]);
      } else {
        this.loader.showSpinner();
        this.scheduleService.getById(scheduleId)?.subscribe({
          next: (res) => {
            const translated =
              this.languageService.translateSingleSchedule(res);

            this.item.next(translated);
          },
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
          complete: () => this.loader.hideSpinner(),
        });

        const subscriptionItem = this.item.subscribe((res) => {
          if (res) {
            this.enrollmentsService.getBySchedule(res.id)?.subscribe({
              next: (res) => {
                this.enrollments = res;
                this.changes.markForCheck();
              },
              error: (err) => {
                catchError(err);
                this.loader.hideSpinner();
              },
              complete: () => this.loader.hideSpinner(),
            });
          }
        });

        this.subscription.push(subscriptionItem);
      }
    });
    this.subscription.push(subscriptionParam);
  }

  ngOnDestroy(): void {
    this.subscription?.forEach((s) => s.unsubscribe());
  }

  public backToSchedule() {
    this.location.back();
  }
}
