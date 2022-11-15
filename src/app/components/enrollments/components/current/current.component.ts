import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Schedule } from '@schedulesModule/types';
import { DateService } from '@services/date.service';
import { CancellEnrollmentEvent } from '@enrollmentsModule/types';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  @Output() setDate = new EventEmitter<string>();
  @Input() items: Schedule[] = [];
  @Input() archive?: boolean;

  showDate = false;

  fieldName = 'date';

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.setDate.emit(this.dateService.baseScheduleDate);
  }

  closeDate = () => {
    if (!this.showDate) {
      return;
    }
    this.showDate = !this.showDate;
  };

  toggleDate = (form: FormGroup) => {
    this.showDate = !this.showDate;
    if (!this.showDate) {
      this.setDate.emit(form.get(this.fieldName)?.value ?? '');
    }
  };

  getDate = (form: FormGroup) =>
    this.dateService.getDate(form.get(this.fieldName)?.value);

  getTimePart = this.dateService.getTime;

  cancell = ({ scheduleId }: CancellEnrollmentEvent) => {
    this.items = this.items.filter((item) => item.id !== scheduleId);
  };
}
