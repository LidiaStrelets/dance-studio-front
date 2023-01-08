import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { environment } from '@root/environments/environment';
import { Hall, Languages, TranslatedHall } from '@homeModule/types/types';
import { HallService } from '@homeModule/services/hall.service';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy {
  private halls: Hall[] = [];
  private timeoutId;

  public translatedHalls: TranslatedHall[] = [];
  public mainImage = `${environment.basicUrl}main.png`;
  public titleStyle = {};

  constructor(
    private hallService: HallService,
    private languageService: LanguageService,
    private spinner: LoaderService,
    private platformService: PlatformService,
    private changes: ChangeDetectorRef
  ) {
    this.timeoutId = setTimeout(() => {
      this.titleStyle = this.platformService.isPlatformIos()
        ? {
            position: 'relative',
            paddingTop: 0,
          }
        : {};
    }, 1000);
  }

  ngOnInit() {
    setTimeout(() => {
      this.spinner.showSpinner();
      this.hallService.get()?.subscribe({
        next: (res) => {
          this.halls = res;
          this.changes.markForCheck();
          this.translatedHalls = this.languageService.translateHalls(res);
        },
        error: (err) => {
          catchError(err);
          this.spinner.hideSpinner();
        },
        complete: () => this.spinner.hideSpinner(),
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  public handleSetLanguage(language: Languages) {
    this.translatedHalls = this.languageService.translateHalls(
      this.halls,
      language
    );
    this.changes.markForCheck();
  }
}
