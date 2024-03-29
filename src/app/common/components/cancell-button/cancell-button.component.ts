import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { catchError } from 'rxjs';
import { Training } from '@schedulesModule/types/types';
import { AlertService } from '@services/alert.service';
import { DateService } from '@services/date.service';
import { LoaderService } from '@services/loader.service';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { CancellEnrollmentEvent } from '@enrollmentsModule/types/types';
import { CoachClass } from '@coachClassesModule/types/types';

@Component({
  selector: 'app-cancell-button',
  templateUrl: './cancell-button.component.html',
  styleUrls: ['./cancell-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancellButtonComponent implements OnInit {
  @Input()
  item: Training | CoachClass = {} as Training;

  @Output()
  cancellEnrollment = new EventEmitter<CancellEnrollmentEvent>();

  constructor(
    private alertService: AlertService,
    private loader: LoaderService,
    private enrollmentService: EnrollmentsService,
    private dateService: DateService
  ) {}

  ngOnInit() {}

  private canCancell(date: string) {
    return (
      new Date(
        Date.now() + this.dateService.hourInMs * 2 + this.dateService.dayInMs
      ) < new Date(date)
    );
  }

  private handleCancel() {
    this.loader.showSpinner();
    this.enrollmentService.cancell(this.item.id)?.subscribe({
      next: () => {
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().enrollmentCancellMessage
        );

        this.cancellEnrollment.emit({ scheduleId: this.item.id });
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }

  public cancell(item: Training | CoachClass) {
    if (!this.canCancell(item.date_time)) {
      this.alertService.presentAreYouSure(
        this.alertService.getTranslations().enrollmentCancellConfirmation,
        this.handleCancel
      );
      return;
    }
    this.handleCancel();
  }
}
