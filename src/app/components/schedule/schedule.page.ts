import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Pagination } from 'swiper';
import { SchedulesService } from './services/schedules.service';

Swiper.use([Pagination]);

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit, AfterContentChecked {
  @ViewChild('slides') swiper?: SwiperComponent;

  config: SwiperOptions = {
    pagination: true,
  };
  activeSlide = 0;

  constructor(private sched: SchedulesService) {}

  ngOnInit() {
    // until the admin functionality is done will keep this for creating schedules
    // this.sched.create().subscribe({
    //   next: (res) => console.log('upipi', res),
    //   error: (err) => console.log('error', err),
    // });
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});

      this.swiper.swiperRef.on('slideChange', (e) => {
        this.activeSlide = e.realIndex;
      });
    }
  }

  getActiveSlide = () => this.activeSlide;
}
