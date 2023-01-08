import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { Training, TrainingFull } from '@schedulesModule/types/types';
import { CommonService } from '@schedulesModule/services/common.service';
import { SchedulesService } from '@schedulesModule/services/schedules.service';

@Component({
  selector: 'app-coach-schedule',
  templateUrl: './coach-schedule.component.html',
  styleUrls: ['./coach-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachScheduleComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  current = -1;

  private weekSchedule: TrainingFull[] = [];
  private subscription: Subscription = {} as Subscription;

  public items: Training[] = [];
  public filters = new BehaviorSubject<{ days: number[]; coach: string }>({
    days: [],
    coach: '',
  });
  public selectValue: number[] = [];
  public radioItems;
  public names: { name: string; id: string }[] = [];

  constructor(
    private usersService: UsersService,
    private common: CommonService,
    private loader: LoaderService,
    private schedulesService: SchedulesService,
    private languageService: LanguageService,
    private changes: ChangeDetectorRef
  ) {
    this.radioItems = this.common.radioItems;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;
      if (propName === 'current' && value === 1) {
        this.loader.showSpinner();
        this.schedulesService.getWeek()?.subscribe({
          next: (res) => {
            this.weekSchedule = res;
          },
          error: (err) => {
            catchError(err);
          },
          complete: () => {
            this.usersService.getCoaches()?.subscribe({
              next: (res) => {
                this.names = res.map((coach) => ({
                  name: this.usersService.getUserName(coach),
                  id: coach.id,
                }));

                this.changes.markForCheck();
              },
              error: (err) => {
                catchError(err);
                this.loader.hideSpinner();
              },
              complete: () => this.loader.hideSpinner(),
            });
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

  ngOnDestroy(): void {
    if (this.subscription.unsubscribe) {
      this.subscription?.unsubscribe();
    }
  }

  public selectCoach(id: string) {
    this.filters.next({ coach: id, days: this.filters.value.days });
  }

  public setSelectedDays(days: number[]) {
    this.filters.next({ days, coach: this.filters.value.coach });
  }

  public trackSchedules(index: number, item: Training) {
    return item.id;
  }
}
