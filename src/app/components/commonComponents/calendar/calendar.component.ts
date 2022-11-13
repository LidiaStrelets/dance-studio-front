import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { routesPaths } from 'src/app/app-routing.module';
import { LanguageService } from 'src/app/services/language.service';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() showDate = false;
  @Input() archive?: boolean;
  @Input() toggleDate?: (form: FormGroup) => void;
  @Input() getDate?: (form: FormGroup) => void;

  dateForm: FormGroup = {} as FormGroup;

  constructor(
    private languageService: LanguageService,
    private dateService: DateService,
    private location: Location
  ) {
    this.dateForm = new FormGroup({
      date: new FormControl(this.dateService.baseScheduleDate),
    });
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
      this.location.path().includes(routesPaths.schedule)
    ) {
      return this.dateService.getMaxEnrollmentsDate();
    } else if (this.archive) {
      return this.dateService.baseScheduleDate;
    } else return null;
  };

  isUk = this.languageService.isUk;
}
