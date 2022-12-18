import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DateService } from '@services/date.service';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { Training, TrainingFull } from '@schedulesModule/types';
import { ClassesService } from '@classesModule/services/classes.service';
import { CommonService } from '@schedulesModule/services/common.service';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { ClassItemFull } from '@classesModule/types';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss'],
})
export class ClassScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isCurrent = false;

  items: Training[] = [];
  weekSchedule: TrainingFull[] = [];

  classes: ClassItemFull[] = [];

  filters = new BehaviorSubject<{ days: number[]; classItem: string }>({
    days: [],
    classItem: '',
  });
  selectValue: number[] = [];

  subscription: Subscription = {} as Subscription;

  constructor(
    private classesService: ClassesService,
    private dateService: DateService,
    private languageService: LanguageService,
    private common: CommonService,
    private loader: LoaderService,
    private schedulesService: SchedulesService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'isCurrent' && value) {
        this.loader.showSpinner();
        this.schedulesService.getWeek()?.subscribe({
          next: (res) => (this.weekSchedule = res),
          error: catchError,
          complete: () => this.loader.hideSpinner(),
        });

        this.loader.showSpinner();
        this.classesService.getClasses()?.subscribe({
          next: (res) => {
            this.classes = res;
          },
          error: catchError,
          complete: () => this.loader.hideSpinner(),
        });

        this.subscription = this.filters.subscribe((res) => {
          this.items = this.languageService.translateSchedule(
            this.weekSchedule
          );
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription.unsubscribe) {
      this.subscription.unsubscribe();
    }
  }

  radioItems = this.common.radioItems;

  translateClasses = () => this.languageService.translateClasses(this.classes);

  selectClass = (id: string) => {
    this.filters.next({ classItem: id, days: this.filters.value.days });
  };

  setSelectedDays = (days: number[]) => {
    this.filters.next({ days, classItem: this.filters.value.classItem });
  };

  getWeekDay = this.dateService.getWeekDay;
}
