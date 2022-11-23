import { Location } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { routesPaths } from '@app/app-routing.module';
import { LanguageService } from '@services/language.service';
import { DateService } from '@services/date.service';
import { IonDatetime } from '@ionic/angular';

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

  // the only option found to style calendar
  // @ViewChild('date', { read: ElementRef, static: false })
  // calendar?: ElementRef;

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

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     console.log('hey', this.calendar?.nativeElement);
  //     const shadow: DocumentFragment = this.calendar?.nativeElement.shadowRoot;
  //     const buttons = shadow.querySelectorAll('ion-picker-column-internal');

  //     buttons.forEach((button) => {
  //       console.log(button);

  //       button.style.fontSize = '10px';
  //       // this.renderer.setAttribute(day, 'part', 'day');
  //     });
  //   }, 2000);
  // }

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
    } else return null;
  };

  isUk = this.languageService.isUk;
}
