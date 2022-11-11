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
import { UsersService } from 'src/app/components/user/services/users.service';
import { DateService } from 'src/app/services/date.service';
import { LanguageService } from 'src/app/services/language.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Schedule, ScheduleFull, User } from 'src/types';
import { CommonService } from '../../services/common.service';
import { SchedulesService } from '../../services/schedules.service';

@Component({
  selector: 'app-coach-schedule',
  templateUrl: './coach-schedule.component.html',
  styleUrls: ['./coach-schedule.component.scss'],
})
export class CoachScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isCurrent = false;

  filteredItems: Schedule[] = [];

  weekSchedule: ScheduleFull[] = [];
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
            this.filteredItems = this.languageService.translateSchedule(
              this.weekSchedule
            );

            if (res.coach) {
              this.filteredItems = this.filteredItems.filter((item) => {
                return item.coach_id === res.coach;
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

  getNames = () =>
    this.coaches.map((coach) => ({
      name: coach.firstname + ' ' + coach.lastname,
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
