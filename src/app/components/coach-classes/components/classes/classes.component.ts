import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Schedule } from '@schedulesModule/types';
import { DateService } from '@services/date.service';
import { EClassTypes, PersonalClass } from '../../types';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  @Output() setDate = new EventEmitter<string>();
  @Input() items: PersonalClass[] = [];
  @Input() archive?: boolean;

  showDate = false;

  fieldName = 'date';

  types = EClassTypes;

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

  getTimePart = (item: Schedule) => this.dateService.getTime(item.date_time);

  getClassType = (item: PersonalClass) => {
    const typeTranslation = this.translate.instant(
      `coachClasses.type.${item.type}`
    );
    const restTranslation = this.translate.instant(`coachClasses.class`);

    return `${typeTranslation} ${restTranslation}`;
  };

  getClients = (item: PersonalClass) => item.clients;
}
