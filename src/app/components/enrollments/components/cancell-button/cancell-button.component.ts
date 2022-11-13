import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError } from 'rxjs';
import { Schedule } from 'src/app/components/schedule/types';
import { AlertService } from 'src/app/services/alert.service';
import { DateService } from 'src/app/services/date.service';
import { LoaderService } from 'src/app/services/loader.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { CancellEnrollmentEvent } from '../../types';

@Component({
  selector: 'app-cancell-button',
  templateUrl: './cancell-button.component.html',
  styleUrls: ['./cancell-button.component.scss'],
})
export class CancellButtonComponent implements OnInit {
  @Input() item: Schedule = {} as Schedule;

  @Output() cancellEnrollment = new EventEmitter<CancellEnrollmentEvent>();

  constructor(
    private alertService: AlertService,
    private loader: LoaderService,
    private enrollmentService: EnrollmentsService,
    private dateService: DateService
  ) {}

  ngOnInit() {}

  canCancell = (date: Date) =>
    new Date(
      Date.now() + this.dateService.hourInMs() * 2 + this.dateService.dayInMs()
    ) < date;

  cancell = (item: Schedule) => {
    if (!this.canCancell(item.date_time)) {
      this.alertService.presentAreYouSure(
        this.alertService.getTranslations().enrollmentCancellConfirmation,
        this.handleCancel
      );
      return;
    }
    this.handleCancel();
  };

  handleCancel = () => {
    this.loader.showSpinner();
    this.enrollmentService.cancell(this.item.id)?.subscribe({
      next: () => {
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().enrollmentCancellMessage
        );

        this.cancellEnrollment.emit({ scheduleId: this.item.id });
        this.loader.hideSpinner();
      },
      error: (err) => {
        this.loader.hideSpinner();
        catchError(err);
      },
    });
  };
}
