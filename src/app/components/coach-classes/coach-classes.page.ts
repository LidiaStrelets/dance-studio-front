import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Personal } from '@personalsModule/types';
import { DateService } from '@services/date.service';
import { LanguageService } from '@services/language.service';
import { SocketService } from '@services/socket.service';
import { BehaviorSubject, catchError, Subscription } from 'rxjs';
import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { CoachClass } from './types';

Swiper.use([Pagination]);

@Component({
  selector: 'app-coach-classes',
  templateUrl: './coach-classes.page.html',
  styleUrls: ['./coach-classes.page.scss'],
})
export class CoachClassesPage implements OnInit {
  @ViewChild('slides') swiper?: SwiperComponent;

  items: CoachClass[] = [];
  registrations: CoachClass[] = [];
  personals: CoachClass[] = [];

  config: SwiperOptions = {
    pagination: true,
  };

  selectedDate = new BehaviorSubject('');
  subscription: Subscription = {} as Subscription;

  constructor(
    private enrollmentsService: EnrollmentsService,
    private personalService: PersonalsService,
    private dateService: DateService,
    private languageService: LanguageService,
    private socketService: SocketService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    setTimeout(() => {
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
            this.personals = result.map((item) =>
              this.personalService.addType(item)
            );

            this.items = [...this.personals, ...this.registrations];
          },
        });
      });

      this.socketService.subscribeOnPersonal((item: Personal) => {
        if (
          item.coach_id !== this.authService.getCurrentUserId() ||
          this.dateService.isOtherDate(item.date_time, this.selectedDate.value)
        ) {
          return;
        }
        const mapped = this.personalService.addType(item);

        if (this.items.some((classItem) => classItem.id === item.id)) {
          this.items = this.items.map((classItem) =>
            classItem.id === item.id ? mapped : classItem
          );
        } else {
          this.items = [...this.items, mapped];
        }
      });
    }, 1500);
  }

  setDate = (date: string) => {
    this.selectedDate.next(date);
  };

  getActive = () => this.dateService.getActiveItems(this.items);
  getArchive = () => this.dateService.getArchiveItems(this.items);
}
