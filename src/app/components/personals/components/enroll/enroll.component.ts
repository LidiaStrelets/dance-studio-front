import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError } from 'rxjs';
import { ClassesService } from '@classesModule/services/classes.service';
import { ClassItem } from '@classesModule/types';
import { UsersService } from '@userModule/services/users.service';
import { User } from '@userModule/types';
import { DateService } from '@services/date.service';
import { FormService } from '@services/form.service';
import { LoaderService } from '@services/loader.service';
import {
  CreatePersonal,
  PersonalFormFields,
  Statuses,
} from '@personalsModule/types';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { AlertService } from '@services/alert.service';
import { Router } from '@angular/router';
import { routesPaths } from '@app/app-routing.module';
import { SocketService } from '@services/socket.service';
import { LanguageService } from '@services/language.service';
import { ZoneTimePipe } from '@app/pipes/zone-time.pipe';
import { FormatDatePipe } from '@app/pipes/format-date.pipe';
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollComponent implements OnInit {
  @ViewChild('calendar') calendar!: CalendarComponent;

  coaches: User[] = [];
  translatedClasses: ClassItem[] = [];

  personalForm = new FormGroup({
    coach: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    date: new FormControl(
      this.dateService.baseScheduleDate,
      Validators.required
    ),
    duration: new FormControl<number | null>(null, [
      Validators.pattern('^[0-9]*$'),
      Validators.required,
      Validators.min(60),
      Validators.max(120),
    ]),
    message: new FormControl(''),
  });
  personalFormFields = PersonalFormFields;

  selectedDate = new BehaviorSubject('');

  constructor(
    private usersService: UsersService,
    private classesService: ClassesService,
    private loader: LoaderService,
    private dateService: DateService,
    private formService: FormService,
    private personalsService: PersonalsService,
    private alertService: AlertService,
    private router: Router,
    private socketService: SocketService,
    private languageService: LanguageService,
    private zoneTime: ZoneTimePipe,
    private formatDate: FormatDatePipe,
    private changes: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await setTimeout(() => {
      return null;
    }, 1500);
    this.usersService.getCoaches()?.subscribe({
      next: (res) => {
        this.coaches = res;
        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
    });
    this.classesService.getClasses()?.subscribe({
      next: (res) => {
        this.translatedClasses = this.languageService.translateClasses(res);
        this.changes.markForCheck();
      },
    });
  }

  getName = this.usersService.getUserName;

  getValidation = this.formService.getValidation;
  getErrors = this.formService.getErrors;
  inputStyles = this.formService.inputStyles;

  handleSubmit = () => {
    if (!this.personalForm.valid) {
      return;
    }
    const input: CreatePersonal = {
      coach_id: this.personalForm.value.coach!,
      class_id: this.personalForm.value.class!,
      date_time: this.zoneTime.transform(this.personalForm.value.date!),
      duration: this.personalForm.value.duration!,
      status: Statuses.created,
    };
    if (this.personalForm.value.message) {
      input.message = this.personalForm.value.message;
    }
    this.alertService.presentAlertConfirmData(
      this.personalsService.createConfirmData(
        input,
        this.coaches,
        this.translatedClasses
      ),
      () => {
        this.loader.showSpinner();

        this.personalsService.create(input)?.subscribe({
          next: (res) => {
            this.personalForm.reset();

            this.alertService.presentAlertSuccess(
              this.alertService.getTranslations().personalSuccessMessage
            );

            this.socketService.emitPersonal(res);

            this.backToPersonals();
          },
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
          complete: () => this.loader.hideSpinner(),
        });
      }
    );
  };

  handleDate = (date: string) => {
    this.selectedDate.next(date);

    this.personalForm.patchValue({
      date,
    });
  };

  backToPersonals = () => {
    this.router.navigate(['../', routesPaths.personals]);
  };
}
