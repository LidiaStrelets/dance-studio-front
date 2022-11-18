import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { ClassesService } from '@classesModule/services/classes.service';
import { ClassItem, ClassItemFull } from '@classesModule/types';
import { HallService } from '@homeModule/services/hall.service';
import { Hall } from '@homeModule/types';
import { TranslateService } from '@ngx-translate/core';
import {
  CreatePersonal,
  Personal,
  PersonalSchedule,
} from '@personalsModule/types';
import { environment } from '@root/environments/environment';
import { Schedule } from '@schedulesModule/types';
import { DateService } from '@services/date.service';
import { LanguageService } from '@services/language.service';
import { UsersService } from '@userModule/services/users.service';
import { User } from '@userModule/types';
import { catchError, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalsService {
  private coreUrl = `${environment.basicUrl}personals/`;
  private personals: Personal[] = [];

  private coaches: User[] = [];
  private classes: ClassItemFull[] = [];
  private translatedClasses: ClassItem[] = [];
  private halls: Hall[] = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private userService: UsersService,
    private dateService: DateService,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private classesService: ClassesService,
    private hallService: HallService
  ) {
    this.userService.getCoaches().then((observable) => {
      observable?.subscribe({
        next: (res) => {
          this.coaches = res;
          this.userService.setCoaches(res);
        },
        error: catchError,
      });
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
  }

  create(personal: CreatePersonal): Observable<Personal> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .post<Personal>(
        this.coreUrl + this.authService.getCurrentUserId(),
        personal
      )
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1),
        map((data) => {
          data.date_time = new Date(data.date_time);

          return data;
        })
      );
  }

  getByUser(): Observable<Personal[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Personal[]>(this.coreUrl + this.authService.getCurrentUserId())
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1),
        map((data) => {
          data.forEach((item) => {
            item.date_time = new Date(item.date_time);
          });

          return data;
        })
      );
  }

  getByCoachAndDate(date: string): Observable<PersonalSchedule[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<PersonalSchedule[]>(
        this.coreUrl +
          'byCoach/' +
          this.authService.getCurrentUserId() +
          '/' +
          date.split('T')[0]
      )
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1),
        map((data) => {
          data.forEach((item) => {
            item.date_time = new Date(item.date_time);
          });

          return data;
        })
      );
  }

  createConfirmData = (
    personal: CreatePersonal,
    coaches: User[],
    classes: ClassItem[]
  ): string => {
    const coach = coaches.find(({ id }) => id === personal.coach_id);
    const classItem = classes.find(({ id }) => id === personal.class_id);

    const translation = this.translateService.instant(
      'alert.confirmationPersonal',
      {
        date: this.dateService.getDateTime(personal.date_time),
        coach: this.userService.getUserName(coach!),
        class: classItem?.name,
        duration: personal.duration,
      }
    );

    return translation;
  };

  setPersonals = (personal: Personal) =>
    (this.personals = [...this.personals, personal]);
  getPersonals = () => this.personals;

  addData = ({
    coach_id,
    hall_id,
    class_id,
    date_time,
    id,
    duration,
  }: Personal | PersonalSchedule): Schedule | undefined => {
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
      coach: this.userService.getUserName(coach!),
      class: classItem!.name,
      hall: hallName || '',
    };
  };
}
