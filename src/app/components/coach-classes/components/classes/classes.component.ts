import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Output() setDate = new EventEmitter<string>();
  @Input() items: CoachClass[] = [];
  @Input() archive?: boolean;

  showDate = false;

  fieldName = 'date';

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

  toggleDate = (form: FormGroup) => {
    this.showDate = !this.showDate;
    if (!this.showDate) {
      this.setDate.emit(form.get(this.fieldName)?.value ?? '');
    }
  };

  getDate = (form: FormGroup) =>
    this.dateService.getDate(form.get(this.fieldName)?.value);

  closeDate = () => {
    if (!this.showDate) {
      return;
    }
    this.showDate = !this.showDate;
  };

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
