import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ELanguages, LocalStorageKeys, MenuItem } from 'src/types';
import { routesPaths } from './app-routing.module';
import { ErrorService } from './services/error.service';
import { AuthService } from './components/auth/services/auth.service';
import { AlertService } from './services/alert.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      name: 'Home page',
      translatedName: 'Home page',
      link: ['../', routesPaths.home],
    },
    {
      name: 'My profile',
      translatedName: 'My profile',
      link: ['../', routesPaths.user],
    },
    {
      name: 'My payments',
      translatedName: 'My payments',
      link: ['../', routesPaths.payments],
    },
    {
      name: 'Schedules',
      translatedName: 'Schedules',
      link: ['../', routesPaths.schedule],
    },
    {
      name: 'Coaches',
      translatedName: 'Coaches',
      link: ['../', routesPaths.coaches],
    },
    {
      name: 'Classes',
      translatedName: 'Classes',
      link: ['../', routesPaths.classes],
    },
    {
      name: 'Prices',
      translatedName: 'Prices',
      link: ['../', routesPaths.prices],
    },
  ];
  languageKey = LocalStorageKeys.language;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private alertService: AlertService,
    private errorService: ErrorService,
    private location: Location
  ) {
    this.translateService.setDefaultLang(
      localStorage.getItem(this.languageKey) ?? ELanguages.en
    );

    if (
      this.location.path().split('/')[1] !== routesPaths.login &&
      this.location.path().split('/')[1] !== routesPaths.register &&
      this.location.path().split('/')[1] !== routesPaths.default
    ) {
      authService.getUserIdFromToken()?.subscribe({
        next: (res) => this.authService.setUserId(res.data.id),
        error: (err) =>
          this.alertService.presentAlertError(
            this.errorService.generateMessage(err)
          ),
      });
    }
  }

  getTranslation = (i: number) => {
    this.translateService
      .get(`menu.${this.menuItems[i].name}`)
      .pipe(take(1))
      .subscribe((res) => (this.menuItems[i].translatedName = res));
    return this.menuItems[i].translatedName;
  };

  handleLogout = () => this.authService.logout();
}
