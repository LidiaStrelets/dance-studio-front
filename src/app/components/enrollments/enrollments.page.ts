import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';
import { Schedule, ScheduleFull } from 'src/types';
import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { SchedulesService } from '../schedule/services/schedules.service';
import { DateService } from '../user/services/date.service';

Swiper.use([Pagination]);

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.page.html',
  styleUrls: ['./enrollments.page.scss'],
})
export class EnrollmentsPage implements OnInit, AfterContentChecked, OnDestroy {
  @ViewChild('slides') swiper?: SwiperComponent;
  config: SwiperOptions = {
    pagination: true,
  };

  schedule: ScheduleFull[] = [];
  scheduleItems: Schedule[] = [];

  selectedDate = new BehaviorSubject('');
  byDateItems: Schedule[] = [];
  byDateArchiveItems: Schedule[] = [];
  subscription: Subscription = {} as Subscription;

  constructor(
    private dateService: DateService,
    private languageService: LanguageService,
    private schedulesService: SchedulesService
  ) {}

  ngOnInit() {
    this.schedulesService.getEnrolled().subscribe({
      next: (res) => {
        this.schedule = res;

        this.scheduleItems = this.languageService.translateSchedule(res);

        this.byDateItems = this.scheduleItems.filter(
          (item) =>
            new Date(item.date_time).getTime() >
              new Date(Date.now()).getTime() &&
            this.dateService.getDate(item.date_time) ===
              this.dateService.getDate(this.dateService.baseScheduleDate)
        );

        this.byDateArchiveItems = this.scheduleItems.filter(
          (item) =>
            new Date(item.date_time).getTime() <
              new Date(Date.now()).getTime() &&
            this.dateService.getDate(item.date_time) ===
              this.dateService.getDate(this.dateService.baseScheduleDate)
        );
      },
      error: catchError,
    });

    this.subscription = this.selectedDate.subscribe((res) => {
      this.byDateItems =
        this.schedule.length > 0
          ? this.languageService
              .translateSchedule(this.schedule)
              .filter(
                (item) =>
                  new Date(item.date_time).getTime() >
                    new Date(Date.now()).getTime() &&
                  this.dateService.getDate(item.date_time) ===
                    this.dateService.getDate(res)
              )
          : [];

      this.byDateArchiveItems =
        this.schedule.length > 0
          ? this.languageService
              .translateSchedule(this.schedule)
              .filter(
                (item) =>
                  new Date(item.date_time).getTime() <
                    new Date(Date.now()).getTime() &&
                  this.dateService.getDate(item.date_time) ===
                    this.dateService.getDate(res)
              )
          : [];
    });
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setDate = (date: string) => {
    this.selectedDate.next(date);
  };

  getByDate = () => this.byDateItems;
  getByDateArchive = () => this.byDateArchiveItems;

  onSlideChange = () => {
    this.selectedDate.next(this.dateService.getMinEnrollmentsDate());
  };
}
