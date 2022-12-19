import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Training } from '@schedulesModule/types';
import { DateService } from '@services/date.service';
import { CancellEnrollmentEvent } from '@enrollmentsModule/types';
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit, OnChanges {
  @ViewChild('calendar') calendar!: CalendarComponent;

  @Output() setDate = new EventEmitter<string>();
  @Input() items: Training[] = [];
  @Input() archive?: boolean;
  @Input() current = 0;

  constructor(private dateService: DateService) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let value = change.currentValue;

      if (propName === 'current') {
        if ((value === 0 && !this.archive) || (value === 1 && this.archive)) {
          setTimeout(() => {
            this.setDate.emit(this.calendar.getDate());
          }, 1000);
        }
      }
    }
  }

  handleDate = (date: string) => this.setDate.emit(date);

  cancell = ({ scheduleId }: CancellEnrollmentEvent) => {
    this.items = this.items.filter((item) => item.id !== scheduleId);
  };

  getTimeLeft = (date: string) => {
    const left =
      new Date(date).getTime() - Date.now() - this.dateService.hourInMs();
    const minutes = this.dateService.convertIntoMinutes(left);

    return Math.round(minutes);
  };

  trackEnrollments = (index: number, item: Training) => item.id;
}
