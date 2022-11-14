import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { EnrollmentsService } from 'src/app/components/enrollments/services/enrollments.service';
import { LoaderService } from 'src/app/services/loader.service';
import { DateService } from 'src/app/services/date.service';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SchedulesService } from '../../services/schedules.service';
import { LanguageService } from 'src/app/services/language.service';
import { Schedule } from '../../types';
import { Registration } from 'src/app/components/enrollments/types';

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

  modalId = new BehaviorSubject<string>('');
  modalItem: Schedule = {} as Schedule;

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

    this.modalId.subscribe((res) => {
      this.modalItem =
        this.items.find(({ id }) => id === res) || ({} as Schedule);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'isCurrent') {
        if (value) {
          this.subscription = this.selectedDate.subscribe((res) => {
            if (res) {
              this.schedulesService.get(res)?.subscribe({
                next: (result) => {
                  this.items = this.languageService.translateSchedule(result);

                  this.loader.hideSpinner();

                  this.enrollmentService.getByDate(res)?.subscribe({
                    next: (res) => {
                      this.enrollments = res;
                      this.items = this.addEnrolled(result, res);

                      this.loader.hideSpinner();
                    },
                    error: (err) => {
                      this.loader.hideSpinner();
                      catchError(err);
                    },
                  });
                },
                error: (err) => {
                  this.loader.hideSpinner();
                  catchError(err);
                },
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
  // closeDate = () => {
  //   if (!this.showDate) {
  //     return;
  //   }
  //   this.showDate = !this.showDate;
  // };

  getDate = (form: FormGroup) =>
    this.dateService.getDate(form.get(this.fieldName)?.value);
  getTimePart = this.dateService.getTime;

  enroll = (item: Registration) => {
    this.enrollments.push(item);
    this.items = this.addEnrolled(this.items, this.enrollments);
  };

  isCoach = this.authService.isCoach();

  test = async (schedule_id: string) => {
    this.modalId.next(schedule_id);
  };
}
