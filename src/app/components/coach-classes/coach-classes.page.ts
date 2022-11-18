import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Personal, PersonalSchedule } from '@personalsModule/types';
import { Schedule } from '@schedulesModule/types';
import { BehaviorSubject, catchError, Subscription } from 'rxjs';
import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { PersonalClass } from './types';

Swiper.use([Pagination]);

@Component({
  selector: 'app-coach-classes',
  templateUrl: './coach-classes.page.html',
  styleUrls: ['./coach-classes.page.scss'],
})
export class CoachClassesPage implements OnInit {
  @ViewChild('slides') swiper?: SwiperComponent;

  items: PersonalClass[] = [];
  registrations: PersonalClass[] = [];
  personals: PersonalClass[] = [];

  config: SwiperOptions = {
    pagination: true,
  };
  activeSlide = 0;

  selectedDate = new BehaviorSubject('');
  subscription: Subscription = {} as Subscription;

  constructor(
    private enrollmentsService: EnrollmentsService,
    private personalService: PersonalsService
  ) {}

  ngOnInit() {
    this.subscription = this.selectedDate.subscribe((res) => {
      if (!res) {
        return;
      }

      this.enrollmentsService.getByDateAndCoachMapped(res)?.subscribe({
        next: (res) => {
          this.registrations = res.map((item) => ({ ...item, type: 'group' }));

          this.items = [...this.registrations, ...this.personals];
        },
        error: catchError,
      });

      this.personalService.getByCoachAndDate(res)?.subscribe({
        next: (result) => {
          const personals = result.reduce((array, item) => {
            const mapped = this.personalService.addData(item);

            return mapped
              ? [...array, { ...mapped, client_id: item.client_id }]
              : array;
          }, [] as PersonalSchedule[]);

          this.personals = personals.map((item) => ({
            ...item,
            type: 'personal',
          }));
          this.items = [...this.personals, ...this.registrations];
        },
      });
    });
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});

      this.swiper.swiperRef.on('slideChange', (e) => {
        this.activeSlide = e.realIndex;
      });
    }
  }

  setDate = (date: string) => {
    this.selectedDate.next(date);
  };

  getActive = () =>
    this.items.filter((item) => item.date_time > new Date(Date.now()));

  getItems = () => this.items;
}
