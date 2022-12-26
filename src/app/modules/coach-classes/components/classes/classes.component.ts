import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { routesPaths } from '@app/app-routing.module';
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';
import { CoachClass } from '@coachClassesModule/types/types';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesComponent implements OnInit {
  @ViewChild('calendar')
  calendar!: CalendarComponent;

  @Output()
  setDate = new EventEmitter<string>();

  @Input()
  items: CoachClass[] = [];
  @Input()
  archive?: boolean;
  @Input()
  current = 0;

  public rootPath = routesPaths.coachClasses;

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

  public trackMessage(index: number, item: CoachClass) {
    return item['id'];
  }
}
