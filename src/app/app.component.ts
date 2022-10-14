import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuItems = [
    { name: 'Home page', link: ['../', 'home'] },
    { name: 'My profile', link: ['../', 'user'] },
    { name: 'My payments', link: ['./', 'payments'] },
    { name: 'Schedules', link: ['./', 'schedules'] },
    { name: 'Coaches', link: ['./', 'coaches'] },
    { name: 'Classes', link: ['./', 'classes'] },
    { name: 'Prices', link: ['./', 'prices'] },
  ];

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('EN');
    this.translateService.addLangs(['EN', 'UK']);
  }
}
