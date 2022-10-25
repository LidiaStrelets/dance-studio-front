import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorService } from 'src/app/services/error.service';
import { Schedule, User } from 'src/types';
import { DateService } from '../../user/services/date.service';
import { UsersService } from '../../user/services/users.service';
import { CommonService } from '../servvices/common.service';

@Component({
  selector: 'app-coach-schedule',
  templateUrl: './coach-schedule.component.html',
  styleUrls: ['./coach-schedule.component.scss'],
})
export class CoachScheduleComponent implements OnInit, OnChanges {
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

  constructor(
    private usersService: UsersService,
    private dateService: DateService,
    private errorService: ErrorService,
    private alertService: AlertService,
    private common: CommonService
  ) {}

  ngOnInit() {
    this.usersService.getCoaches().subscribe({
      next: (res) => (this.coaches = res),
      error: (err) =>
        this.alertService.presentAlertError(
          this.errorService.generateMessage(err)
        ),
    });

    this.selectedDays.subscribe((res) => {
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
