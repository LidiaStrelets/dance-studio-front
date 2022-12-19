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
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';
import { TranslateService } from '@ngx-translate/core';
import { Statuses } from '@personalsModule/types';
import { EClassTypes, CoachClass } from '../../types';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesComponent implements OnInit {
  @ViewChild('calendar') calendar!: CalendarComponent;

  @Output() setDate = new EventEmitter<string>();
  @Input() items: CoachClass[] = [];
  @Input() archive?: boolean;
  @Input() current = 0;

  types = EClassTypes;

  statuses = Statuses;

  pickedHall = '';

  constructor(private translate: TranslateService) {}

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

  getClients = (item: CoachClass) => item.clients;

  status = (item: CoachClass) => {
    if (item.type === EClassTypes.personal) {
      return item.status;
    } else {
      if (!item.clients || item.clients.length < 3) {
        return 'no-group';
      } else return '';
    }
  };

  statusMessage = (item: CoachClass) => {
    const status = this.status(item);
    return this.translate.instant(`coachClasses.status.${status}`);
  };

  setHall = (hallId: string) => {
    this.pickedHall = hallId;
  };

  trackMessage(index: number, item: CoachClass) {
    return item.id;
  }
}
