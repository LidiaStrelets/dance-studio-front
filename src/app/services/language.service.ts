import { Injectable } from '@angular/core';
import { ELanguages, Languages, LocalStorageKeys } from 'src/types';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languageKey = LocalStorageKeys.language;
  private languages: Languages[] = [];
  private language: Languages = ELanguages.en;

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(
      localStorage.getItem(this.languageKey) ?? ELanguages.en
    );
    this.translateService.addLangs([ELanguages.en, ELanguages.uk]);
    this.languages = this.translateService.getLangs() as Languages[];
  }

  setLanguage = (language: Languages) => {
    this.language = language;

    this.translateService.use(language);

    localStorage.setItem(this.languageKey, language);
  };

  getLanguage = () => this.language;

  getLanguages = () => this.languages;
}