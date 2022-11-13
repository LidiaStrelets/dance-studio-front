import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';
import { ELanguages, Hall, TranslatedHall } from 'src/types';
import { HallService } from './services/hall.service';

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
    private spinner: LoaderService
  ) {}

  ngOnInit() {
    this.spinner.showSpinner();
    this.hallService.get()?.subscribe({
      next: (res) => {
        this.halls = res;
        this.translate();
        this.spinner.hideSpinner();
      },
      error: (err) => {
        this.spinner.hideSpinner();
        catchError(err);
      },
    });
  }

  toggleLanguages = () => {
    this.showLanguages = !this.showLanguages;

    if (this.showLanguages) {
      return;
    }
    this.translate();
  };

  private translate = () => {
    if (this.languageService.getLanguage() === ELanguages.en) {
      this.translatedHalls = this.halls.map(
        ({ name, description, id, picture }) => ({
          name,
          description,
          id,
          picture,
        })
      );
    } else {
      this.translatedHalls = this.halls.map(
        ({ nameUk, descriptionUk, id, picture }) => ({
          name: nameUk,
          description: descriptionUk,
          id,
          picture,
        })
      );
    }
  };
}
