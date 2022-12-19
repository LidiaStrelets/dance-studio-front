import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { PersonalsService } from '@personalsModule/services/personals.service';
import { Personal } from '@personalsModule/types';
import { DateService } from '@services/date.service';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  currentSlide = 0;

  constructor(
    private enrollmentsService: EnrollmentsService,
    private personalService: PersonalsService,
    private dateService: DateService,
    private languageService: LanguageService,
    private socketService: SocketService,
    private authService: AuthService,
    private loader: LoaderService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.subscription = this.selectedDate.subscribe((res) => {
        if (!res) {
          return;
        }
        this.loader.showSpinner();
        this.enrollmentsService.getByDateAndCoachMapped(res)?.subscribe({
          next: (res) => {
            this.registrations = res.map((item) => ({
              ...item,
              type: 'group',
              hall: this.languageService.isUk() ? item.hallUk : item.hall,
              class: this.languageService.isUk() ? item.classUk : item.class,
            }));

            this.items = [...this.registrations, ...this.personals];
            this.loader.hideSpinner();
            this.changes.markForCheck();
          },
          error: (err) => {
            catchError(err);
            this.loader.hideSpinner();
          },
        });

        this.personalService.getByCoachAndDate(res)?.subscribe({
          next: (result) => {
            this.personals = result.map((item) =>
              this.personalService.addType(item)
            );

            this.items = [...this.personals, ...this.registrations];
            this.changes.markForCheck();
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
        this.changes.markForCheck();
      });
    }, 1500);
  }

  setDate = (date: string) => {
    this.selectedDate.next(date);
  };

  handleSliding = (e: [swiper: Swiper]) => {
    const [swiper] = e;

    this.currentSlide = swiper.activeIndex;
  };
}
