import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKeys, MenuItem } from '@root/app/types';
import { routesPaths } from '@root/app/app-routing.module';
import { AuthService } from '@authModule/services/auth.service';
import { LoaderService } from '@services/loader.service';
import { ELanguages } from '@homeModule/types';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      id: 0,
      name: 'Home page',
      translatedName: 'Home page',
      link: ['../', routesPaths.home],
    },
    {
      id: 1,
      name: 'My profile',
      translatedName: 'My profile',
      link: ['../', routesPaths.user],
    },
    {
      id: 2,
      name: 'My payments',
      translatedName: 'My payments',
      link: ['../', routesPaths.payments],
    },
    {
      id: 3,
      name: 'Schedules',
      translatedName: 'Schedules',
      link: ['../', routesPaths.schedule],
    },
    {
      id: 4,
      name: 'Enrollments',
      translatedName: 'Enrollments',
      link: ['../', routesPaths.enrollments],
    },
    {
      id: 5,
      name: 'Personals',
      translatedName: 'Personals',
      link: ['../', routesPaths.personals],
    },
    {
      id: 6,
      name: 'Coaches',
      translatedName: 'Coaches',
      link: ['../', routesPaths.coaches],
    },
    {
      id: 7,
      name: 'Classes',
      translatedName: 'Classes',
      link: ['../', routesPaths.classes],
    },
    {
      id: 9,
      name: 'Prices',
      translatedName: 'Prices',
      link: ['../', routesPaths.prices],
    },
    {
      id: 10,
      name: 'CoachClasses',
      translatedName: 'CoachClasses',
      link: ['../', routesPaths.coachClasses],
    },
  ];
  languageKey = LocalStorageKeys.language;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private loader: LoaderService
  ) {
    this.translateService.setDefaultLang(
      localStorage.getItem(this.languageKey) ?? ELanguages.en
    );

    if (authService.isAuthenticated()) {
      this.authService.getUserData();
    }

    const id = setInterval(() => {
      if (this.authService.getUserRole()) {
        clearInterval(id);
      }
      if (this.authService.isCoach()) {
        this.menuItems = this.menuItems.filter(
          (item) => ![2, 4, 5].some((number) => item.id === number)
        );
      }
      if (this.authService.isClient()) {
        this.menuItems = this.menuItems.filter(
          (item) => ![10].some((number) => item.id === number)
        );
      }
    }, 1000);
  }

  getTranslation = (i: number) => {
    this.translateService
      .get(`menu.${this.menuItems[i].name}`)
      .subscribe((res) => (this.menuItems[i].translatedName = res));
    return this.menuItems[i].translatedName;
  };

  handleLogout = () => {
    this.loader.showSpinner();
    this.authService.logout();
  };
}
