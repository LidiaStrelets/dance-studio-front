import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AlertService } from '@services/alert.service';
import { LoaderService } from '@services/loader.service';
import { Training } from '@schedulesModule/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { Registration } from '@enrollmentsModule/types';
import { CoachClass } from '@coachClassesModule/types';

@Component({
  selector: 'app-item-buttons',
  templateUrl: './item-buttons.component.html',
  styleUrls: ['./item-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemButtonsComponent implements OnInit {
  @Input() item: Training | CoachClass = {} as Training;
  @Output() newEnrollment = new EventEmitter<Registration>();
  @Output() showModal = new EventEmitter<string>();

  constructor(
    private enrollmentService: EnrollmentsService,
    private alertService: AlertService,
    private loader: LoaderService
  ) {}

  ngOnInit() {}

  canEnroll = (date: string) => new Date(Date.now() + 7200000) < new Date(date);

  enroll = (scheduleId: string) => {
    this.loader.showSpinner();
    this.enrollmentService.enroll(scheduleId)?.subscribe({
      next: (res) => {
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().enrollmentSuccessMessage
        );

        this.newEnrollment.emit(res);
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  };
}
