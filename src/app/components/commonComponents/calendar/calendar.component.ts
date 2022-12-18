import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { routesPaths } from '@app/app-routing.module';
import { LanguageService } from '@services/language.service';
import { DateService } from '@services/date.service';

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

  needsTime = false;

  constructor(
    private languageService: LanguageService,
    private dateService: DateService,
    private location: Location
  ) {
    this.dateForm = new FormGroup({
      date: new FormControl(this.dateService.baseScheduleDate),
    });
  }

  ngOnInit() {
    if (this.location.path().includes(routesPaths.personals)) {
      this.needsTime = true;
    }
  }

  getMinDate = () => {
    let date;
    if (this.location.path().includes(routesPaths.schedule) || this.archive) {
      date = this.dateService.getMinScheduleDate();
    } else {
      date = this.dateService.baseScheduleDate;
    }
    const zoned = new Date(date).toLocaleString('en-GB', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    return `${date.split('T')[0]}T${zoned.split(', ')[1]}`;
  };

  getMaxDate = () => {
    let date;
    if (
      (this.location.path().includes(routesPaths.enrollments) &&
        !this.archive) ||
      this.location.path().includes(routesPaths.schedule) ||
      this.location.path().includes(routesPaths.personals) ||
      (this.location.path().includes(routesPaths.coachClasses) && !this.archive)
    ) {
      date = this.dateService.getMaxEnrollmentsDate();
    } else if (this.archive) {
      date = this.dateService.baseScheduleDate;
    }
    if (date) {
      const zoned = new Date(date).toLocaleString('en-GB', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      return `${date.split('T')[0]}T${zoned.split(', ')[1]}`;
    } else return null;
  };

  isUk = this.languageService.isUk;
}
