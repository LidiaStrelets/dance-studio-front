import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateService } from 'src/app/components/user/services/date.service';
import { Schedule } from 'src/types';

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
      this.setDate.emit(form.get('date')?.value ?? '');
    }
  };

  getDate = (form: FormGroup) =>
    this.dateService.getDate(form.get('date')?.value);

  getTimePart = this.dateService.getTime;

  getTimeLeft = (date: string) => {
    const left = new Date(date).getTime() - Date.now() - 60 * 60 * 1000;
    const minutes = left / 1000 / 60;

    return Math.round(minutes);
  };
}
