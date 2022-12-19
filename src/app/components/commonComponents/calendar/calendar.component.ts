import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { routesPaths } from '@app/app-routing.module';
import { LanguageService } from '@services/language.service';
import { DateService } from '@services/date.service';
import { FormatDatePipe } from '@app/pipes/format-date.pipe';
import { DateFormat } from '@app/types';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() archive?: boolean;
  @Output() onSetDate = new EventEmitter<string>();

  dateForm: FormGroup = {} as FormGroup;
  showDate = false;
  date = '';
  format: DateFormat = 'date';

  constructor(
    private languageService: LanguageService,
    private dateService: DateService,
    private location: Location,
    private formatDate: FormatDatePipe
  ) {
    this.dateForm = new FormGroup({
      date: new FormControl(this.dateService.baseScheduleDate),
    });
    if (location.path().includes(routesPaths.personals)) {
      this.format = 'date-time';
    }
    this.date = formatDate.transform(dateService.baseScheduleDate, this.format);
  }

  ngOnInit() {}

  getMinDate = () => {
    if (this.location.path().includes(routesPaths.schedule) || this.archive) {
      return this.dateService.getMinScheduleDate();
    } else {
      return this.dateService.baseScheduleDate;
    }
  };

  getMaxDate = () => {
    if (
      (this.location.path().includes(routesPaths.enrollments) &&
        !this.archive) ||
      this.location.path().includes(routesPaths.schedule) ||
      this.location.path().includes(routesPaths.personals) ||
      (this.location.path().includes(routesPaths.coachClasses) && !this.archive)
    ) {
      return this.dateService.getMaxEnrollmentsDate();
    } else if (this.archive) {
      return this.dateService.baseScheduleDate;
    } else return '';
  };

  isUk = this.languageService.isUk;

  toggleDate = () => {
    this.showDate = !this.showDate;

    if (!this.showDate && this.date !== this.getDate()) {
      this.onSetDate.emit(this.getDate());
      this.date = this.getDate();
    }
  };

  getDate = () =>
    this.formatDate.transform(this.dateForm.get('date')?.value, this.format);

  closeDate = () => {
    if (!this.showDate) {
      return;
    }
    this.showDate = !this.showDate;
  };
}
