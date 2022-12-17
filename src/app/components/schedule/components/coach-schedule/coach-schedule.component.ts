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
import { UsersService } from '@userModule/services/users.service';
import { DateService } from '@services/date.service';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { Training, TrainingFull } from '@schedulesModule/types';
import { CommonService } from '@schedulesModule/services/common.service';
import { SchedulesService } from '@schedulesModule/services/schedules.service';
import { User } from '@userModule/types';

@Component({
  selector: 'app-coach-schedule',
  templateUrl: './coach-schedule.component.html',
  styleUrls: ['./coach-schedule.component.scss'],
})
export class CoachScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isCurrent = false;

  items: Training[] = [];

  weekSchedule: TrainingFull[] = [];
  coaches: User[] = [];

  filters = new BehaviorSubject<{ days: number[]; coach: string }>({
    days: [],
    coach: '',
  });
  selectValue: number[] = [];

  subscription: Subscription = {} as Subscription;

  constructor(
    private usersService: UsersService,
    private dateService: DateService,
    private common: CommonService,
    private loader: LoaderService,
    private schedulesService: SchedulesService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {}

  async ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'isCurrent') {
        if (value) {
          this.loader.showSpinner();

          this.schedulesService.getWeek()?.subscribe({
            next: (res) => {
              this.weekSchedule = res;
            },
            error: catchError,
          });

          const observable = await this.usersService.getCoaches();
          observable?.subscribe({
            next: (res) => {
              this.coaches = res;
              this.loader.hideSpinner();
            },
            error: (err) => {
              this.loader.hideSpinner();
              catchError(err);
            },
          });

          this.subscription = this.filters.subscribe((res) => {
            this.items = this.languageService.translateSchedule(
              this.weekSchedule
            );
          });
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription.unsubscribe) {
      this.subscription?.unsubscribe();
    }
  }

  radioItems = this.common.radioItems;

  getNames = () =>
    this.coaches.map((coach) => ({
      name: this.usersService.getUserName(coach),
      id: coach.id,
    }));

  selectCoach = (id: string) => {
    this.filters.next({ coach: id, days: this.filters.value.days });
  };

  setSelectedDays = (days: number[]) => {
    this.filters.next({ days, coach: this.filters.value.coach });
  };

  getWeekDay = this.dateService.getWeekDay;
  getTime = this.dateService.getTime;
}
