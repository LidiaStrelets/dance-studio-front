import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { environment } from '@root/environments/environment';
import { Hall, TranslatedHall } from '@homeModule/types';
import { HallService } from '@homeModule/services/hall.service';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  halls: Hall[] = [];
  mainImage = `${environment.basicUrl}main.png`;

  constructor(
    private hallService: HallService,
    private languageService: LanguageService,
    private spinner: LoaderService,
    private platformService: PlatformService,
    private changes: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.spinner.showSpinner();
      this.hallService.get()?.subscribe({
        next: (res) => {
          this.halls = res;
          this.changes.markForCheck();
        },
        error: (err) => {
          catchError(err);
          this.spinner.hideSpinner();
        },
        complete: () => this.spinner.hideSpinner(),
      });
    }, 1000);
  }

  translatedHalls = (): TranslatedHall[] =>
    this.languageService.translateHalls(this.halls);

  titleStyle = () =>
    this.platformService.isPlatformIos()
      ? {
          position: 'relative',
          paddingTop: 0,
        }
      : {};
}
