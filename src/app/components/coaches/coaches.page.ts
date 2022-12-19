import {
  AfterContentChecked,
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
import { User } from '@userModule/types';

Swiper.use([Pagination, EffectCube]);

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.page.html',
  styleUrls: ['./coaches.page.scss'],
})
export class CoachesPage implements OnInit, AfterContentChecked {
  @ViewChild('slides') swiper?: SwiperComponent;

  avatar = `${environment.basicUrl}no_photo.webp`;

  config: SwiperOptions = {
    pagination: true,
    effect: 'cube',
    cubeEffect: {
      slideShadows: false,
    },
  };
  coaches: User[] = [];

  constructor(
    private usersService: UsersService,
    private loader: LoaderService
  ) {}

  async ngOnInit() {
    this.loader.showSpinner();
    const observable = await this.usersService.getCoaches();

    observable?.subscribe({
      next: (res) => {
        this.coaches = res;
      },
      error: (err) => {
        catchError(err);
        this.loader.hideSpinner();
      },
      complete: () => this.loader.hideSpinner(),
    });
  }

  getName = this.usersService.getUserName;

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }
}
