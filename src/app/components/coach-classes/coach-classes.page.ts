import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { PersonalSchedule } from '@personalsModule/types';
import { DateService } from '@services/date.service';
import { LanguageService } from '@services/language.service';
import { BehaviorSubject, catchError, Subscription } from 'rxjs';
import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { EClassTypes, PersonalClass } from './types';

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

  selectedDate = new BehaviorSubject('');
  subscription: Subscription = {} as Subscription;

  constructor(
    private enrollmentsService: EnrollmentsService,
    private personalService: PersonalsService,
    private dateService: DateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.subscription = this.selectedDate.subscribe((res) => {
      if (!res) {
        return;
      }

      this.enrollmentsService.getByDateAndCoachMapped(res)?.subscribe({
        next: (res) => {
          this.registrations = res.map((item) => ({
            ...item,
            type: 'group',
            hall: this.languageService.isUk() ? item.hallUk : item.hall,
            class: this.languageService.isUk() ? item.classUk : item.class,
          }));

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
            type: EClassTypes.personal,
            clients: [item.client_id],
          }));
          this.items = [...this.personals, ...this.registrations];
        },
      });
    });
  }

  setDate = (date: string) => {
    this.selectedDate.next(date);
  };

  getActive = () => this.dateService.getActiveItems(this.items);
  getArchive = () => this.dateService.getArchiveItems(this.items);

  getItems = () => this.items;
}
