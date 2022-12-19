import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CalendarComponent } from '@commonComponents/calendar/calendar.component';
import { TranslateService } from '@ngx-translate/core';
import { Statuses } from '@personalsModule/types';
import { DateService } from '@services/date.service';
import { EClassTypes, CoachClass } from '../../types';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  @ViewChild('calendar') calendar!: CalendarComponent;

  @Output() setDate = new EventEmitter<string>();
  @Input() items: CoachClass[] = [];
  @Input() archive?: boolean;

  types = EClassTypes;

  statuses = Statuses;

  pickedHall = '';

  constructor(
    private dateService: DateService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.setDate.emit(this.dateService.baseScheduleDate);
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
