import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '@services/loader.service';
import { environment } from '@root/environments/environment';
import Swiper, { EffectCube, Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { UsersService } from '@userModule/services/users.service';
import { User } from '@userModule/types/types';

Swiper.use([Pagination, EffectCube]);

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.page.html',
  styleUrls: ['./coaches.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachesPage implements OnInit {
  @ViewChild('slides')
  swiper?: SwiperComponent;

  public avatar = `${environment.basicUrl}no_photo.webp`;
  public config: SwiperOptions = {
    pagination: true,
    effect: 'cube',
    cubeEffect: {
      slideShadows: false,
    },
  };
  public coaches: User[] = [];

  constructor(
    private usersService: UsersService,
    private loader: LoaderService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loader.showSpinner();
    const observable = this.usersService.getCoaches();

    observable?.subscribe({
      next: (res) => {
        this.coaches = res;
        this.changes.markForCheck();
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }
}
