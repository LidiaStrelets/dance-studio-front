import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { Training } from '@schedulesModule/types/types';
import { EnrollmentsService } from '@enrollmentsModule/services/enrollments.service';
import { LanguageService } from '@services/language.service';

Swiper.use([Pagination]);

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.page.html',
  styleUrls: ['./enrollments.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentsPage implements OnInit, OnDestroy {
  @ViewChild('slides')
  swiper?: SwiperComponent;

  private selectedDate = new BehaviorSubject('');
  private subscription: Subscription = {} as Subscription;

  public config: SwiperOptions = {
    pagination: true,
  };
  public items: Training[] = [];
  public currentSlide = 0;

  constructor(
    private loader: LoaderService,
    private enrollmentsService: EnrollmentsService,
    private languageService: LanguageService,
    private changes: ChangeDetectorRef
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
          this.changes.markForCheck();
        },
        error: (err) => {
          catchError(err);
          this.loader.hideSpinner();
        },
        complete: () => this.loader.hideSpinner(),
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public handleSliding(e: [swiper: Swiper]) {
    const [swiper] = e;
    this.currentSlide = swiper.activeIndex;
  }

  public setDate(date: string) {
    this.selectedDate.next(date);
  }
}
