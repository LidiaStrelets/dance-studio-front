import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { LanguageService } from '@services/language.service';
import { Languages } from '@homeModule/types/types';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesComponent implements OnInit {
  @Output()
  onSetLanguage = new EventEmitter<Languages>();

  public languages: Languages[] = [];
  public showLanguages = false;
  public currentLanguage;

  constructor(
    private languageService: LanguageService,
    private changes: ChangeDetectorRef
  ) {
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
  }

  public setLanguage(language: Languages) {
    this.languageService.setLanguage(language);
    this.toggleLanguages();
    this.onSetLanguage.emit(language);

    this.currentLanguage = language;
  }

  public toggleLanguages() {
    this.showLanguages = !this.showLanguages;
    this.changes.markForCheck();
  }
}
