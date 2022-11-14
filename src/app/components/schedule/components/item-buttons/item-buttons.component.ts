import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { routesPaths } from '@app/app-routing.module';
import { AlertService } from '@services/alert.service';
import { LoaderService } from '@services/loader.service';
import { Schedule } from '@schedulesModule/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { Registration } from '@enrollmentsModule/types';

@Component({
  selector: 'app-item-buttons',
  templateUrl: './item-buttons.component.html',
  styleUrls: ['./item-buttons.component.scss'],
})
export class ItemButtonsComponent implements OnInit {
  @Input() item: Schedule = {} as Schedule;
  @Output() newEnrollment = new EventEmitter<Registration>();
  @Output() showModal = new EventEmitter<string>();

  constructor(
    private enrollmentService: EnrollmentsService,
    private alertService: AlertService,
    private loader: LoaderService,
    private router: Router
  ) {}

  ngOnInit() {}

  canEnroll = (date: Date) => new Date(Date.now() + 7200000) < date;

  enroll = (scheduleId: string) => {
    this.loader.showSpinner();
    this.enrollmentService.enroll(scheduleId)?.subscribe({
      next: (res) => {
        this.alertService.presentAlertSuccess(
          this.alertService.getTranslations().enrollmentSuccessMessage
        );

        this.newEnrollment.emit(res);

        this.loader.hideSpinner();
      },
      error: (err) => {
        this.loader.hideSpinner();
        catchError(err);
      },
    });
  };

  openClick = (id: string) => {
    this.router.navigate([routesPaths.schedule, id]);
  };
}
