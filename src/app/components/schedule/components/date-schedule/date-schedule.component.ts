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
import { Training } from '@schedulesModule/types';
import { Registration } from '@enrollmentsModule/types';
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';

@Component({
  selector: 'app-date-schedule',
  templateUrl: './date-schedule.component.html',
  styleUrls: ['./date-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('calendar') calendar!: CalendarComponent;

  @Input() isCurrent = false;

  items: Training[] = [];
  selectedDate = new BehaviorSubject('');

  enrollments: Registration[] = [];

  subscription?: Subscription;

  modalId = new BehaviorSubject<string>('');
  modalItem: Training = {} as Training;

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

    this.modalId.subscribe((res) => {
      this.modalItem =
        this.items.find(({ id }) => id === res) || ({} as Training);
      this.loader.hideSpinner();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'isCurrent') {
        if (value) {
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
                      this.changes.detectChanges();
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

  private addEnrolled = (items: Training[], enrollments: Registration[]) =>
    items.map((item) =>
      enrollments.some((enr) => item.id === enr.schedule_id)
        ? { ...item, enrolled: true }
        : { ...item, enrolled: false }
    );

  handleDate = (date: string) => this.selectedDate.next(date);

  enroll = (item: Registration) => {
    this.enrollments.push(item);
    this.items = this.addEnrolled(this.items, this.enrollments);
    this.changes.detectChanges();
  };

  trachSchedules = (index: number, item: Training) => item.id;
}
