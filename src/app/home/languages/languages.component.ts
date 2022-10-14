import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Languages } from 'src/types';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  @Input() showLanguagesMenu = false;
  @Output() closeMenu = new EventEmitter();

  languages: Languages[] = ['EN', 'UK'];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {}

  setLanguage = (language: Languages) => {
    this.languageService.setLanguage(language);
    this.closeMenu.emit();
  };
}
