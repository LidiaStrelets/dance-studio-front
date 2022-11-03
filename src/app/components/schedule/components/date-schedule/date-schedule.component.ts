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
import { CancellEnrollmentEvent, Registration, Schedule } from 'src/types';
import { catchError } from 'rxjs/operators';
import { DateService } from 'src/app/components/user/services/date.service';
import { EnrollmentsService } from 'src/app/components/enrollments/services/enrollments.service';
import { LoaderService } from 'src/app/services/loader.service';

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

  constructor(
    private dateService: DateService,
    private enrollmentService: EnrollmentsService,
    private loader: LoaderService
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
        this.loader.hideSpinner()
        catchError(err)
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
      this.setDate.emit(form.get('date')?.value ?? '');
    }
  };
  closeDate = () => {
    if (!this.showDate) {
      return;
    }
    this.showDate = !this.showDate;
  };

  getDate = (form: FormGroup) =>
    this.dateService.getDate(form.get('date')?.value);
  getTimePart = this.dateService.getTime;

  enroll = (item: Registration) => {
    this.enrollments.push(item);
    this.items = this.addEnrolled(this.items, this.enrollments);
  };
  cancell = ({ scheduleId }: CancellEnrollmentEvent) => {
    this.enrollments = this.enrollments.filter(
      (enr) => enr.schedule_id !== scheduleId
    );
    this.items = this.addEnrolled(this.items, this.enrollments);
  };
}
