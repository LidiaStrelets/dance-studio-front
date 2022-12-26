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
import { Training } from '@schedulesModule/types/types';
import { CancellEnrollmentEvent } from '@enrollmentsModule/types/types';
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit, OnChanges {
  @ViewChild('calendar')
  calendar!: CalendarComponent;

  @Output()
  setDate = new EventEmitter<string>();

  @Input()
  items: Training[] = [];
  @Input()
  archive?: boolean;
  @Input()
  current = 0;

  constructor() {}

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

  public handleDate(date: string) {
    return this.setDate.emit(date);
  }

  public cancell({ scheduleId }: CancellEnrollmentEvent) {
    this.items = this.items.filter((item) => item.id !== scheduleId);
  }

  public trackEnrollments(index: number, item: Training) {
    return item.id;
  }
}
