import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Registration, Schedule } from 'src/types';
import { catchError } from 'rxjs/operators';
import { EnrollmentsService } from 'src/app/components/enrollments/services/enrollments.service';
import { LoaderService } from 'src/app/services/loader.service';
import { DateService } from 'src/app/services/date.service';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SchedulesService } from '../../services/schedules.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-date-schedule',
  templateUrl: './date-schedule.component.html',
  styleUrls: ['./date-schedule.component.scss'],
})
export class DateScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isCurrent = false;

  items: Schedule[] = [];
  selectedDate = new BehaviorSubject('');

  showDate = false;

  enrollments: Registration[] = [];

  fieldName = 'date';

  subscription?: Subscription;

  constructor(
    private dateService: DateService,
    private enrollmentService: EnrollmentsService,
    private loader: LoaderService,
    private authService: AuthService,
    private schedulesService: SchedulesService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();
    this.selectedDate.next(this.dateService.baseScheduleDate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'isCurrent') {
        if (value) {
          this.enrollmentService.getEnrollments()?.subscribe({
            next: (res) => {
              this.enrollments = res;
              this.items = this.addEnrolled(this.items, res);

              this.loader.hideSpinner();
            },
            error: (err) => {
              this.loader.hideSpinner();
              catchError(err);
            },
          });

          this.subscription = this.selectedDate.subscribe((res) => {
            this.schedulesService.get(res)?.subscribe({
              next: (res) => {
                this.items = this.languageService.translateSchedule(res);

                this.loader.hideSpinner();
              },
              error: (err) => {
                this.loader.hideSpinner();
                catchError(err);
              },
            });
          });
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private addEnrolled = (items: Schedule[], enrollments: Registration[]) =>
    items.map((item) =>
      enrollments.some((enr) => item.id === enr.schedule_id)
        ? { ...item, enrolled: true }
        : { ...item, enrolled: false }
    );

  toggleDate = (form: FormGroup) => {
    this.showDate = !this.showDate;
    if (!this.showDate) {
      this.selectedDate.next(form.get(this.fieldName)?.value ?? '');
    }
  };
  closeDate = () => {
    if (!this.showDate) {
      return;
    }
    this.showDate = !this.showDate;
  };

  getDate = (form: FormGroup) =>
    this.dateService.getDate(form.get(this.fieldName)?.value);
  getTimePart = this.dateService.getTime;

  enroll = (item: Registration) => {
    this.enrollments.push(item);
    this.items = this.addEnrolled(this.items, this.enrollments);
  };

  isCoach = this.authService.isCoach();
}
