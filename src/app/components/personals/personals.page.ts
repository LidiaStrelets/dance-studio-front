import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader.service';
import { catchError } from 'rxjs';
import { routesPaths } from 'src/app/app-routing.module';
import { PersonalsService } from './services/personals.service';
import { Personal } from './types';

@Component({
  selector: 'app-personals',
  templateUrl: './personals.page.html',
  styleUrls: ['./personals.page.scss'],
})
export class PersonalsPage implements OnInit {
  routerPath = routesPaths;

  personals: Personal[] = [];

  constructor(
    private loader: LoaderService,
    private personalService: PersonalsService
  ) {}

  async ngOnInit() {
    this.loader.showSpinner();

    this.personalService.getByUser()?.subscribe({
      next: (res) => (this.personals = res),
      error: catchError,
    });

    this.loader.hideSpinner();
  }

  showItems = () => this.getPersonals.length > 0;

  getPersonals = () => {
    const items = [...this.personals, ...this.personalService.getPersonals()];

    return items.map((item) => this.personalService.addData(item));
  };
}
