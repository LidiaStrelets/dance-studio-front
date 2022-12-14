import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Languages } from '../../types';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  languages: Languages[] = [];
  showLanguages = false;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
  }

  setLanguage = (language: Languages) => {
    this.languageService.setLanguage(language);
    this.toggleLanguages();
  };

  getCurrentLanguage = () => this.languageService.getLanguage();

  toggleLanguages = () => (this.showLanguages = !this.showLanguages);
}
