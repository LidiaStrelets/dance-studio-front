import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '@services/loader.service';
import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Training } from '@schedulesModule/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { LanguageService } from '@services/language.service';
import { DateService } from '@services/date.service';

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

  items: Training[] = [];

  selectedDate = new BehaviorSubject('');
  subscription: Subscription = {} as Subscription;

  currentSlide = 0;

  constructor(
    private loader: LoaderService,
    private enrollmentsService: EnrollmentsService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();

    this.subscription = this.selectedDate.subscribe((res) => {
      if (!res) {
        return;
      }

      this.enrollmentsService.getByDateMapped(res)?.subscribe({
        next: (res) => {
          this.items = this.languageService.translateSchedule(res);
        },
        error: catchError,
        complete: () => this.loader.hideSpinner(),
      });
    });
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});

      this.swiper.swiperRef.on('slideChange', (e) => {
        this.currentSlide = e.activeIndex;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setDate = (date: string) => {
    this.selectedDate.next(date);
  };
}
