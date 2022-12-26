import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { LoaderService } from '@services/loader.service';
import { DateService } from '@services/date.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { LanguageService } from '@services/language.service';
import { Training } from '@schedulesModule/types/types';
import { Registration } from '@enrollmentsModule/types/types';
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';
import { routesPaths } from '@app/app-routing.module';

@Component({
  selector: 'app-date-schedule',
  templateUrl: './date-schedule.component.html',
  styleUrls: ['./date-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('calendar')
  calendar!: CalendarComponent;

  @Input()
  current = -1;

  private selectedDate = new BehaviorSubject('');
  private enrollments: Registration[] = [];
  private subscription?: Subscription;

  public items: Training[] = [];
  public rootPath = routesPaths.schedule;

  constructor(
    private dateService: DateService,
    private enrollmentService: EnrollmentsService,
    private loader: LoaderService,
    private schedulesService: SchedulesService,
    private languageService: LanguageService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loader.showSpinner();
    this.selectedDate.next(this.dateService.baseScheduleDate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'current') {
        if (value === 0) {
          this.loader.showSpinner();
          this.subscription = this.selectedDate.subscribe((res) => {
            if (res) {
              this.schedulesService.get(res)?.subscribe({
                next: (result) => {
                  this.items = this.languageService.translateSchedule(result);

                  this.enrollmentService.getByDate(res)?.subscribe({
                    next: (res) => {
                      this.enrollments = res;
                      this.items = this.addEnrolled(this.items, res);
                      this.changes.markForCheck();
                    },
                    error: (err) => {
                      catchError(err);
                      this.loader.hideSpinner();
                    },
                    complete: () => this.loader.hideSpinner(),
                  });
                },
                error: (err) => {
                  catchError(err);
                  this.loader.hideSpinner();
                },
                complete: () => this.loader.hideSpinner(),
              });
            }
          });
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private addEnrolled(items: Training[], enrollments: Registration[]) {
    return items.map((item) =>
      enrollments.some((enr) => item.id === enr.schedule_id)
        ? { ...item, enrolled: true }
        : { ...item, enrolled: false }
    );
  }

  public handleDate(date: string) {
    return this.selectedDate.next(date);
  }

  public enroll(item: Registration) {
    this.enrollments.push(item);
    this.items = this.addEnrolled(this.items, this.enrollments);
    this.changes.markForCheck();
  }

  public trackSchedules(index: number, item: Training) {
    return item.id;
  }
}
