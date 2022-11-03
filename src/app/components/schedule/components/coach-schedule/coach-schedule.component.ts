import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DateService } from 'src/app/components/user/services/date.service';
import { UsersService } from 'src/app/components/user/services/users.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Schedule, User } from 'src/types';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-coach-schedule',
  templateUrl: './coach-schedule.component.html',
  styleUrls: ['./coach-schedule.component.scss'],
})
export class CoachScheduleComponent implements OnInit, OnChanges, OnDestroy {
  @Output() setCoach = new EventEmitter<string>();
  @Input() items: Schedule[] = [];
  filteredItems: Schedule[] = [];

  coaches: User[] = [];
  selectedCoach = '';

  selectedDays = new BehaviorSubject<{ days: number[]; items: Schedule[] }>({
    days: [],
    items: this.items,
  });
  selectValue: number[] = [];

  subscription: Subscription = {} as Subscription;

  constructor(
    private usersService: UsersService,
    private dateService: DateService,
    private common: CommonService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();
    this.usersService.getCoaches()?.subscribe({
      next: (res) => {
        this.coaches = res;
        this.loader.hideSpinner();
      },
      error: (err) => {
        this.loader.hideSpinner();
        catchError(err);
      },
    });

    this.subscription = this.selectedDays.subscribe((res) => {
      this.filteredItems = this.items.filter((item) => {
        return res.days.some(
          (day) => day + 1 === this.dateService.getWeekDay(item.date_time).id
        );
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'items') {
        this.selectedDays.next({ days: this.selectValue, items: value });
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
    this.setCoach.emit(id);
  };

  setSelectedDays = (days: number[]) => {
    this.selectedDays.next({ days, items: this.items });
  };

  getWeekDay = this.dateService.getWeekDay;
  getTime = this.dateService.getTime;
}
