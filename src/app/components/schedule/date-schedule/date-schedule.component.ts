import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ELanguages, Registration, Schedule } from 'src/types';
import { LanguageService } from 'src/app/services/language.service';
import { DateService } from '../../user/services/date.service';
import { EnrollmentsService } from '../../enrollments/services/enrollments.service';
import { AlertService } from 'src/app/services/alert.service';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-date-schedule',
  templateUrl: './date-schedule.component.html',
  styleUrls: ['./date-schedule.component.scss'],
})
export class DateScheduleComponent implements OnInit, OnChanges {
  @Output() setDate = new EventEmitter<string>();
  @Input() items: Schedule[] = [];

  dateForm: FormGroup = {} as FormGroup;

  showDate = false;

  enrollments: Registration[] = [];

  constructor(
    private languageService: LanguageService,
    private dateService: DateService,
    private enrollmentService: EnrollmentsService,
    private alertService: AlertService,
    private errorService: ErrorService
  ) {
    this.dateForm = new FormGroup({
      date: new FormControl(this.dateService.baseScheduleDate),
    });
  }

  ngOnInit() {
    this.setDate.emit(this.dateService.baseScheduleDate);

    this.enrollmentService.getEnrollments().subscribe({
      next: (res) => {
        this.enrollments = res;
        this.items = this.addEnrolled(this.items, res);
      },
      error: catchError,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'items') {
        this.items = this.addEnrolled(value, this.enrollments);
      }
    }
  }

  private addEnrolled = (items: Schedule[], enrollments: Registration[]) =>
    items.map((item) =>
      enrollments.some((enr) => item.id === enr.schedule_id)
        ? { ...item, enrolled: true }
        : { ...item, enrolled: false }
    );

  toggleDate = () => {
    this.showDate = !this.showDate;
    if (!this.showDate) {
      this.setDate.emit(this.dateForm.get('date')?.value ?? '');
    }
  };
  closeDate = () => {
    if (!this.showDate) {
      return;
    }
    this.showDate = !this.showDate;
  };

  isUk = () => this.languageService.getLanguage() === ELanguages.uk;

  getDate = () => this.dateService.getDate(this.dateForm.get('date')?.value);
  getTimePart = this.dateService.getTime;
  getMinDate = () => new Date('2021-10-01').toISOString();

  canEnroll = (date: string) =>
    new Date(Date.now() + 7200000).toISOString() < date;
  canCancell = (date: string) =>
    new Date(Date.now() + 7200000 + 86400000).toISOString() < date;

  enroll = (scheduleId: string) => {
    this.enrollmentService.enroll(scheduleId).subscribe({
      next: (res) => {
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().enrollmentSuccessMessage
        );
        this.enrollments.push(res);
        this.items = this.addEnrolled(this.items, this.enrollments);
      },
      error: catchError,
    });
  };
  cancell = (scheduleId: string) => {
    const enrollmentId = this.enrollments.find(
      (enr) => enr.schedule_id === scheduleId
    )?.id;
    if (!enrollmentId) {
      this.alertService.presentAlertError(
        this.errorService.generateMessage('', 1)
      );
      return;
    }

    this.enrollmentService.cancell(enrollmentId).subscribe({
      next: (res) => {
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().enrollmentCancellMessage
        );
        this.enrollments = res;
        this.items = this.addEnrolled(this.items, res);
      },
      error: catchError,
    });
  };

  showModal(id: string) {
    console.log('info', id);
  }
}
