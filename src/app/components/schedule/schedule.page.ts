import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Pagination } from 'swiper';
import { Schedule, ScheduleFull } from 'src/types';
import { SchedulesService } from './services/schedules.service';
import { BehaviorSubject } from 'rxjs';
import { DateService } from '../user/services/date.service';
import { LanguageService } from 'src/app/services/language.service';
import { catchError } from 'rxjs/operators';

Swiper.use([Pagination]);

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit, AfterContentChecked {
  @ViewChild('slides') swiper?: SwiperComponent;

  schedule: ScheduleFull[] = [];
  scheduleItems: Schedule[] = [];
  selectedDate = new BehaviorSubject('');
  byDateItems: Schedule[] = [];
  selectedCoach = new BehaviorSubject('');
  byCoachItems: Schedule[] = [];
  selectedClass = new BehaviorSubject('');
  byClassItems: Schedule[] = [];

  config: SwiperOptions = {
    pagination: true,
  };

  constructor(
    private schedulesService: SchedulesService,
    private dateService: DateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.selectedDate.subscribe((res) => {
      this.byDateItems = this.languageService
        .translateSchedule(this.schedule)
        .filter(
          (item) =>
            this.dateService.getDate(item.date_time) ===
            this.dateService.getDate(res)
        );
    });

    this.selectedCoach.subscribe((res) => {
      this.byCoachItems = this.languageService
        .translateSchedule(this.schedule)
        .filter((item) => {
          return (
            item.coach_id === res &&
            item.date_time >= this.dateService.templateWeekStart &&
            item.date_time < this.dateService.templateWeekEnd
          );
        });
    });

    this.selectedClass.subscribe((res) => {
      this.byClassItems = this.languageService
        .translateSchedule(this.schedule)
        .filter((item) => {
          return (
            item.class_id === res &&
            item.date_time >= this.dateService.templateWeekStart &&
            item.date_time < this.dateService.templateWeekEnd
          );
        });
    });

    this.schedulesService.get().subscribe({
      next: (res) => {
        this.schedule = res;

        this.scheduleItems = this.languageService.translateSchedule(res);

        this.byDateItems = this.scheduleItems.filter(
          (item) =>
            this.dateService.getDate(item.date_time) ===
            this.dateService.getDate(this.dateService.baseScheduleDate)
        );
      },
      error: catchError,
    });
  }

  setDate = (date: string) => {
    this.selectedDate.next(date);
  };
  setCoach = (id: string) => {
    this.selectedCoach.next(id);
  };
  setClass = (id: string) => {
    this.selectedClass.next(id);
  };

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  getByDate = () => this.byDateItems;
  getByCoach = () => this.byCoachItems;
  getByClass = () => this.byClassItems;
}
