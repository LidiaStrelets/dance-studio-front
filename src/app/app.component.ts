import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'src/types';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  test = '';
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

  constructor(
    private translateService: TranslateService,
    private authService: AuthService
  ) {}

  getTranslation = (i: number) => {
    this.translateService
      .get(`menu.${this.menuItems[i].name}`)
      .subscribe((res) => (this.menuItems[i].translatedName = res));
    return this.menuItems[i].translatedName;
  };

  handleLogout = () => this.authService.logout();
}
