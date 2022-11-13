import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { Schedule } from 'src/types';
import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { DateService } from '../../services/date.service';
import { EnrollmentsService } from './services/enrollments.service';

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

  items: Schedule[] = [];

  selectedDate = new BehaviorSubject('');
  subscription: Subscription = {} as Subscription;

  constructor(
    private dateService: DateService,
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

  onSlideChange = () => {
    this.selectedDate.next(this.dateService.getMinEnrollmentsDate());
  };
}
