import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKeys, MenuItem } from '@app/common/types/types';
import { routesPaths } from '@root/app/app-routing.module';
import { AuthService } from '@authModule/services/auth.service';
import { LoaderService } from '@services/loader.service';
import { TRoles } from '@userModule/types/types';
import { ELanguages } from '@homeModule/types/types';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menuItems: MenuItem[] = [
    {
      id: 0,
      name: 'Home_page',
      translatedName: 'Home page',
      link: ['../', routesPaths.home],
    },
    {
      id: 1,
      name: 'My_profile',
      translatedName: 'My profile',
      link: ['../', routesPaths.user],
    },
    {
      id: 2,
      name: 'My_payments',
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
    {
      id: 11,
      name: 'Salary',
      translatedName: 'Salary',
      link: ['../', routesPaths.salary],
    },
  ];
  private languageKey = LocalStorageKeys.language;
  public role: TRoles | undefined;

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
      this.role = authService.getUserRole();
    }, 1000);

    this.translateService.get('menu').subscribe((res) => {
      this.menuItems = this.menuItems.map((item) => ({
        ...item,
        translatedName: res[item.name],
      }));
    });
  }

  public handleLogout() {
    this.loader.showSpinner();
    this.authService.logout();
  }
}
