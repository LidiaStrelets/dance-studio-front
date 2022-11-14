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
import { Schedule } from '@schedulesModule/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';

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
  activeSlide = 0;

  items: Schedule[] = [];

  selectedDate = new BehaviorSubject('');
  subscription: Subscription = {} as Subscription;

  constructor(
    private loader: LoaderService,
    private enrollmentsService: EnrollmentsService
  ) {}

  ngOnInit() {
    this.loader.showSpinner();

    this.subscription = this.selectedDate.subscribe((res) => {
      if (!res) {
        return;
      }

      this.enrollmentsService.getByDateMapped(res)?.subscribe({
        next: (res) => {
          this.items = res;
        },
        error: catchError,
      });
    });
    this.loader.hideSpinner();
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});

      this.swiper.swiperRef.on('slideChange', (e) => {
        this.activeSlide = e.realIndex;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setDate = (date: string) => {
    this.selectedDate.next(date);
  };

  getActive = () =>
    this.items.filter((item) => {
      return item.date_time > new Date(Date.now());
    });
  getArchive = () =>
    this.items.filter((item) => item.date_time < new Date(Date.now()));
}
