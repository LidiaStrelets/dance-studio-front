import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Registration, Schedule } from 'src/types';
import { catchError } from 'rxjs/operators';
import { EnrollmentsService } from 'src/app/components/enrollments/services/enrollments.service';
import { LoaderService } from 'src/app/services/loader.service';
import { DateService } from 'src/app/services/date.service';
import { AuthService } from 'src/app/components/auth/services/auth.service';

@Component({
  selector: 'app-date-schedule',
  templateUrl: './date-schedule.component.html',
  styleUrls: ['./date-schedule.component.scss'],
})
export class DateScheduleComponent implements OnInit, OnChanges {
  @Output() setDate = new EventEmitter<string>();
  @Input() items: Schedule[] = [];

  showDate = false;

  enrollments: Registration[] = [];

  fieldName = 'date';

  constructor(
    private dateService: DateService,
    private enrollmentService: EnrollmentsService,
    private loader: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();
    this.setDate.emit(this.dateService.baseScheduleDate);

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

  toggleDate = (form: FormGroup) => {
    this.showDate = !this.showDate;
    if (!this.showDate) {
      this.setDate.emit(form.get(this.fieldName)?.value ?? '');
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
