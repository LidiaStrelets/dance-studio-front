import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ELanguages, LocalStorageKeys, MenuItem } from 'src/types';
import { AuthService } from './auth/auth.service';
import { AlertService } from './services/alert.service';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuItems: MenuItem[] = [
    { name: 'Home page', translatedName: 'Home page', link: ['../', 'home'] },
    { name: 'My profile', translatedName: 'My profile', link: ['../', 'user'] },
    {
      name: 'My payments',
      translatedName: 'My payments',
      link: ['./', 'payments'],
    },
    {
      name: 'Schedules',
      translatedName: 'Schedules',
      link: ['./', 'schedules'],
    },
    { name: 'Coaches', translatedName: 'Coaches', link: ['./', 'coaches'] },
    { name: 'Classes', translatedName: 'Classes', link: ['./', 'classes'] },
    { name: 'Prices', translatedName: 'Prices', link: ['./', 'prices'] },
  ];
  languageKey = LocalStorageKeys.language;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private alertService: AlertService,
    private errorService: ErrorService
  ) {
    this.translateService.setDefaultLang(
      localStorage.getItem(this.languageKey) ?? ELanguages.en
    );
    authService.getUserIdFromToken()?.subscribe({
      next: (res) => this.authService.setUserId(res.data.id),
      error: (err) =>
        this.alertService.presentAlertError(
          this.errorService.generateMessage(err)
        ),
    });
  }

  getTranslation = (i: number) => {
    this.translateService
      .get(`menu.${this.menuItems[i].name}`)
      .subscribe((res) => (this.menuItems[i].translatedName = res));
    return this.menuItems[i].translatedName;
  };

  handleLogout = () => this.authService.logout();
}
