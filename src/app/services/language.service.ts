import { Injectable } from '@angular/core';
import { Languages } from 'src/types';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languages: Languages[] = [];
  private language: Languages = 'EN';

  constructor(private translateService: TranslateService) {
    this.languages = this.translateService.getLangs() as Languages[];
  }

  setLanguage = (language: Languages) => {
    this.language = language;

    this.translateService.use(language);
    console.log(this.language);
  };

  getLanguage = () => this.language;

  getLanguages = () => this.languages;
}
