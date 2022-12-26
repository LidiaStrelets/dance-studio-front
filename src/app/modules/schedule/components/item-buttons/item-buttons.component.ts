import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AlertService } from '@services/alert.service';
import { LoaderService } from '@services/loader.service';
import { Training } from '@schedulesModule/types/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { Registration } from '@enrollmentsModule/types/types';
import { CoachClass } from '@coachClassesModule/types/types';

@Component({
  selector: 'app-item-buttons',
  templateUrl: './item-buttons.component.html',
  styleUrls: ['./item-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemButtonsComponent implements OnInit, OnChanges {
  @Input()
  item: Training | CoachClass = {} as Training;

  @Output()
  newEnrollment = new EventEmitter<Registration>();
  @Output()
  showModal = new EventEmitter<string>();

  public canEnroll = false;

  constructor(
    private enrollmentService: EnrollmentsService,
    private alertService: AlertService,
    private loader: LoaderService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'item' && value) {
        this.canEnroll =
          new Date(Date.now() + 7200000) < new Date(this.item.date_time);
      }
    }
  }

  public enroll(scheduleId: string) {
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
  }
}
