import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ELanguages, Schedule } from 'src/types';
import { LanguageService } from 'src/app/services/language.service';
import { DateService } from '../../user/services/date.service';

@Component({
  selector: 'app-date-schedule',
  templateUrl: './date-schedule.component.html',
  styleUrls: ['./date-schedule.component.scss'],
})
export class DateScheduleComponent implements OnInit {
  @Output() setDate = new EventEmitter<string>();
  @Input() items: Schedule[] = [];

  dateForm: FormGroup = {} as FormGroup;

  showDate = false;

  constructor(
    private languageService: LanguageService,
    private dateService: DateService
  ) {
    this.dateForm = new FormGroup({
      date: new FormControl(this.dateService.baseScheduleDate),
    });
  }

  ngOnInit() {
    this.setDate.emit(this.dateService.baseScheduleDate);
  }

  toggleDate = () => {
    this.showDate = !this.showDate;
    if (!this.showDate) {
      this.setDate.emit(this.dateForm.get('date')?.value ?? '');
    }
  };
  closeDate = () => {
    if (!this.showDate) {
      return;
    }
    this.showDate = !this.showDate;
  };

  isUk = () => this.languageService.getLanguage() === ELanguages.uk;

  getDate = () => this.dateService.getDate(this.dateForm.get('date')?.value);

  getTimePart = this.dateService.getTime;

  getMinDate = () => new Date('2021-10-01').toISOString();
}
