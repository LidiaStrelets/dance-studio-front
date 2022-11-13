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
import { DateService } from 'src/app/services/date.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoaderService } from 'src/app/services/loader.service';
import {  Schedule, ScheduleFull } from './../../types';
import { ClassesService } from '../../../classes/services/classes.service';
import { CommonService } from '../../services/common.service';
import { SchedulesService } from '../../services/schedules.service';
import { ClassItemFull } from 'src/app/components/classes/types';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss'],
})
export class ClassScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isCurrent = false;

  filteredItems: Schedule[] = [];
  weekSchedule: ScheduleFull[] = [];

  classItems: ClassItemFull[] = [];

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

      if (propName === 'isCurrent') {
        if (value) {
          this.loader.showSpinner();

          this.schedulesService.getWeek()?.subscribe({
            next: (res) => (this.weekSchedule = res),
            error: catchError,
          });

          this.classesService.getClasses()?.subscribe({
            next: (res) => {
              this.classItems = res;
              this.loader.hideSpinner();
            },
            error: (err) => {
              this.loader.hideSpinner();
              catchError(err);
            },
          });

          this.subscription = this.filters.subscribe((res) => {
            this.filteredItems = this.languageService.translateSchedule(
              this.weekSchedule
            );

            if (res.classItem) {
              this.filteredItems = this.filteredItems.filter((item) => {
                return item.class_id === res.classItem;
              });
            }
            if (res.days) {
              this.filteredItems = this.filteredItems.filter((item) => {
                return res.days.some(
                  (day) =>
                    day + 1 === this.dateService.getWeekDay(item.date_time).id
                );
              });
            }
          });
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  radioItems = this.common.radioItems;

  getClasses = () =>
    this.classItems.map(({ id, name, nameUk }) =>
      this.languageService.isUk ()
        ? { id, name: nameUk }
        : { id, name }
    );

  selectClass = (id: string) => {
    this.filters.next({ classItem: id, days: this.filters.value.days });
  };

  setSelectedDays = (days: number[]) => {
    this.filters.next({ days, classItem: this.filters.value.classItem });
  };

  getWeekDay = this.dateService.getWeekDay;
  getTime = this.dateService.getTime;
}
