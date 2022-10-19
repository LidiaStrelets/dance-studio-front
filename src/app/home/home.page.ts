import { Component, OnInit } from '@angular/core';
import { ELanguages, Hall, TranslatedHall } from 'src/types';
import { AuthService } from '../auth/services/auth.service';
import { AlertService } from '../services/alert.service';
import { ErrorService } from '../services/error.service';
import { LanguageService } from '../services/language.service';
import { HallService } from './hall.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  halls: Hall[] = [];
  translatedHalls: TranslatedHall[] = [];
  showLanguages = false;

  constructor(
    private hallService: HallService,
    private authService: AuthService,
    private alertService: AlertService,
    private languageService: LanguageService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.hallService.get().subscribe(
      (res) => {
        this.halls = res;
        this.translate();
      },
      (err) => {
        if (err.status === 401) {
          this.authService.deauthenticate();
        } else {
          this.alertService.presentAlertError(
            this.errorService.generateMessage(err)
          );
        }
      }
    );
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
