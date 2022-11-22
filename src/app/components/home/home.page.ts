import { Component, OnInit } from '@angular/core';
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
})
export class HomePage implements OnInit {
  halls: Hall[] = [];
  translatedHalls: TranslatedHall[] = [];
  showLanguages = false;
  mainImage = `${environment.basicUrl}main.png`;

  constructor(
    private hallService: HallService,
    private languageService: LanguageService,
    private spinner: LoaderService,
    private platformService: PlatformService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.spinner.showSpinner();
      this.hallService.get()?.subscribe({
        next: (res) => {
          this.halls = res;
          this.translate();
        },
        error: catchError,
      });

      this.spinner.hideSpinner();
    }, 1000);
  }

  toggleLanguages = () => {
    this.showLanguages = !this.showLanguages;

    if (this.showLanguages) {
      return;
    }
    this.translate();
  };

  private translate = () =>
    (this.translatedHalls = this.languageService.translateHalls(this.halls));

  titleStyle = () =>
    this.platformService.isPlatformIos()
      ? {
          position: 'relative',
          paddingTop: 0,
        }
      : {};
}
