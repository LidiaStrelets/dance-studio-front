import { Component, OnInit } from '@angular/core';
import { ClassesService } from '@classesModule/services/classes.service';
import { ClassItem, ClassItemFull } from '@classesModule/types';
import { LoaderService } from '@services/loader.service';
import { UsersService } from '@userModule/services/users.service';
import { User } from '@userModule/types';
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

  coaches: User[] = [];
  classes: ClassItemFull[] = [];
  translatedClasses: ClassItem[] = [];

  constructor(
    private loader: LoaderService,
    private personalService: PersonalsService,
    private usersService: UsersService,
    private classesService: ClassesService
  ) {}

  async ngOnInit() {
    this.loader.showSpinner();

    this.personalService.getByUser()?.subscribe({
      next: (res) => (this.personals = res),
      error: catchError,
    });

    const observable = await this.usersService.getCoaches();
    observable?.subscribe({
      next: (res) => {
        this.coaches = res;
        this.usersService.setCoaches(res);
      },
      error: catchError,
    });

    this.classesService.getClasses()?.subscribe({
      next: (res) => {
        this.classes = res;
        this.classesService.setClasses(res);
        this.translatedClasses = this.classesService.translateClasses(res);
      },
      error: catchError,
    });

    this.loader.hideSpinner();
  }
}
