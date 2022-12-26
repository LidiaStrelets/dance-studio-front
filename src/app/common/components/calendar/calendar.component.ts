import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { routesPaths } from '@app/app-routing.module';
import { LanguageService } from '@services/language.service';
import { DateService } from '@services/date.service';
import { FormatDatePipe } from '@pipes/format-date.pipe';
import { DateFormat } from '@app/common/types/types';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input()
  archive?: boolean;
  @Output()
  onSetDate = new EventEmitter<string>();

  private date = '';

  public dateForm;
  public showDate = false;
  public format: DateFormat = 'date';
  public isUk;
  public minDate = this.getMinDate();
  public maxDate = this.getMaxDate();

  constructor(
    private languageService: LanguageService,
    private dateService: DateService,
    private location: Location,
    private formatDate: FormatDatePipe,
    private builder: FormBuilder
  ) {
    this.dateForm = this.builder.group({
      date: [this.dateService.baseScheduleDate],
    });

    this.isUk = this.languageService.isUk;
    if (location.path().includes(routesPaths.personals)) {
      this.format = 'date-time';
    }
    this.date = formatDate.transform(dateService.baseScheduleDate, this.format);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if (propName === 'archive') {
        this.maxDate = this.getMaxDate();
        this.minDate = this.getMinDate();
      }
    }
  }
  private getMinDate() {
    if (this.location.path().includes(routesPaths.schedule) || this.archive) {
      return this.dateService.getMinScheduleDate();
    } else {
      return this.dateService.baseScheduleDate;
    }
  }

  private getMaxDate() {
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
  }

  public closeDate() {
    if (!this.showDate) {
      return;
    }
    this.showDate = !this.showDate;
  }

  public toggleDate() {
    this.showDate = !this.showDate;

    if (!this.showDate && this.date !== this.getDate()) {
      this.onSetDate.emit(this.getDate());
      this.date = this.getDate();
    }
  }

  public getDate() {
    if (!this.dateForm.get('date')?.value) {
      return '';
    }
    return this.formatDate.transform(
      this.dateForm.get('date')?.value!,
      this.format
    );
  }
}
