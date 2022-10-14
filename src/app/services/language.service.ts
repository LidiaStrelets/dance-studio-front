import { Injectable } from '@angular/core';
import { Languages } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language: Languages = 'EN';

  constructor() {}

  setLanguage = (language: Languages) => {
    this.language = language;

    console.log(this.language);
  };

  getLanguage = () => this.language;
}
