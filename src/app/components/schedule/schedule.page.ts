import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Pagination } from 'swiper';
import { ELanguages, Schedule, ScheduleFull } from 'src/types';
import { SchedulesService } from './services/schedules.service';
import { BehaviorSubject } from 'rxjs';
import { DateService } from '../user/services/date.service';
import { LanguageService } from 'src/app/services/language.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorService } from 'src/app/services/error.service';

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
    private languageService: LanguageService,
    private alertService: AlertService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.selectedDate.subscribe((res) => {
      this.byDateItems = this.translateSchedule(this.schedule).filter(
        (item) =>
          this.dateService.getDate(item.date_time) ===
          this.dateService.getDate(res)
      );
    });

    this.selectedCoach.subscribe((res) => {
      this.byCoachItems = this.translateSchedule(this.schedule).filter(
        (item) => {
          return (
            item.coach_id === res &&
            item.date_time >= this.dateService.templateWeekStart &&
            item.date_time < this.dateService.templateWeekEnd
          );
        }
      );
    });

    this.selectedClass.subscribe((res) => {
      this.byClassItems = this.translateSchedule(this.schedule).filter(
        (item) => {
          return (
            item.class_id === res &&
            item.date_time >= this.dateService.templateWeekStart &&
            item.date_time < this.dateService.templateWeekEnd
          );
        }
      );
    });

    this.schedulesService.get().subscribe({
      next: (res) => {
        this.schedule = res;

        this.scheduleItems = this.translateSchedule(res);

        this.byDateItems = this.scheduleItems.filter(
          (item) =>
            this.dateService.getDate(item.date_time) ===
            this.dateService.getDate(this.dateService.baseScheduleDate)
        );
      },
      error: (err) =>
        this.alertService.presentAlertError(
          this.errorService.generateMessage(err)
        ),
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

  translateSchedule = (items: ScheduleFull[]) => {
    if (this.languageService.getLanguage() === ELanguages.en) {
      this.scheduleItems = items.map((item) => ({
        coach_id: item.coach_id,
        hall_id: item.hall_id,
        class_id: item.class_id,
        coach: item.coach,
        hall: item.hall,
        class: item.class,
        date_time: item.date_time,
        id: item.id,
        duration: item.duration,
      }));
    } else {
      this.scheduleItems = items.map((item) => ({
        coach_id: item.coach_id,
        hall_id: item.hall_id,
        class_id: item.class_id,
        coach: item.coach,
        hall: item.hallUk,
        class: item.classUk,
        date_time: item.date_time,
        id: item.id,
        duration: item.duration,
      }));
    }
    return this.scheduleItems;
  };
}
