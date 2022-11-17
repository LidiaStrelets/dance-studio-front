import { Component, OnInit } from '@angular/core';
import { ClassesService } from '@classesModule/services/classes.service';
import { ClassItem, ClassItemFull } from '@classesModule/types';
import { HallService } from '@homeModule/services/hall.service';
import { Hall } from '@homeModule/types';
import { Schedule } from '@schedulesModule/types';
import { LanguageService } from '@services/language.service';
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
  halls: Hall[] = [];

  constructor(
    private loader: LoaderService,
    private personalService: PersonalsService,
    private usersService: UsersService,
    private classesService: ClassesService,
    private hallService: HallService,
    private languageService: LanguageService
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

    this.hallService.get()?.subscribe({
      next: (res) => (this.halls = res),
      error: catchError,
    });

    this.loader.hideSpinner();
  }

  showItems = () =>
    this.personals.length > 0 &&
    this.coaches.length > 0 &&
    this.classes.length > 0 &&
    this.halls.length > 0;

  addData = ({
    coach_id,
    hall_id,
    class_id,
    date_time,
    id,
    duration,
  }: Personal): Schedule | undefined => {
    const coach = this.coaches.find((coach) => coach_id === coach.id);
    const classItem = this.translatedClasses.find(
      (item) => item.id === class_id
    );
    const hall = this.halls.find((hall) => hall.id === hall_id);

    if (!coach || !classItem) {
      return undefined;
    }
    const hallName = this.languageService.isUk() ? hall?.nameUk : hall?.name;

    return {
      coach_id,
      hall_id,
      class_id,
      date_time,
      id,
      duration,
      coach: this.usersService.getUserName(coach!),
      class: classItem!.name,
      hall: hallName || '',
    };
  };

  getPersonals = () => {
    const items = [...this.personals, ...this.personalService.getPersonals()];

    return items.map((item) => this.addData(item));
  };
}
