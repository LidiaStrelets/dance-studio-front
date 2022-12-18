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
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { LoaderService } from '@services/loader.service';
import { DateService } from '@services/date.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { LanguageService } from '@services/language.service';
import { Training } from '@schedulesModule/types';
import { Registration } from '@enrollmentsModule/types';

@Component({
  selector: 'app-date-schedule',
  templateUrl: './date-schedule.component.html',
  styleUrls: ['./date-schedule.component.scss'],
})
export class DateScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isCurrent = false;

  items: Training[] = [];
  selectedDate = new BehaviorSubject('');

  showDate = false;

  enrollments: Registration[] = [];

  fieldName = 'date';

  subscription?: Subscription;

  modalId = new BehaviorSubject<string>('');
  modalItem: Training = {} as Training;

  constructor(
    private dateService: DateService,
    private enrollmentService: EnrollmentsService,
    private loader: LoaderService,
    private schedulesService: SchedulesService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();
    this.selectedDate.next(this.dateService.baseScheduleDate);

    this.modalId.subscribe((res) => {
      this.modalItem =
        this.items.find(({ id }) => id === res) || ({} as Training);
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
                      this.items = this.addEnrolled(this.items, res);

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

  private addEnrolled = (items: Training[], enrollments: Registration[]) =>
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

  getDate = (form: FormGroup) => form.get(this.fieldName)?.value;

  enroll = (item: Registration) => {
    this.enrollments.push(item);
    this.items = this.addEnrolled(this.items, this.enrollments);
  };

  test = async (schedule_id: string) => {
    this.modalId.next(schedule_id);
  };
}
