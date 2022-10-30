import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

Swiper.use([Pagination]);

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.page.html',
  styleUrls: ['./enrollments.page.scss'],
})
export class EnrollmentsPage implements OnInit, AfterContentChecked {
  @ViewChild('slides') swiper?: SwiperComponent;
  config: SwiperOptions = {
    pagination: true,
  };

  constructor() {}

  ngOnInit() {}

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }
}
