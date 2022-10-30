import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { CancellEnrollmentEvent, Registration, Schedule } from 'src/types';
import { EnrollmentsService } from '../../../enrollments/services/enrollments.service';

@Component({
  selector: 'app-item-buttons',
  templateUrl: './item-buttons.component.html',
  styleUrls: ['./item-buttons.component.scss'],
})
export class ItemButtonsComponent implements OnInit {
  @Input() item: Schedule = {} as Schedule;
  @Output() newEnrollment = new EventEmitter<Registration>();
  @Output() cancellEnrollment = new EventEmitter<CancellEnrollmentEvent>();

  constructor(
    private enrollmentService: EnrollmentsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

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

        this.newEnrollment.emit(res);
      },
      error: catchError,
    });
  };

  cancell = (scheduleId: string) => {
    this.enrollmentService.cancell(scheduleId).subscribe({
      next: () => {
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().enrollmentCancellMessage
        );

        this.cancellEnrollment.emit({ scheduleId });
      },
      error: catchError,
    });
  };
}