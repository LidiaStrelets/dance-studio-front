import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { ClassItem } from '@classesModule/types';
import { CoachClass, EClassTypes } from '@coachClassesModule/types';
import { TranslateService } from '@ngx-translate/core';
import {
  CreatePersonal,
  Personal,
  UpdatePersonal,
} from '@personalsModule/types';
import { environment } from '@root/environments/environment';
import { DateService } from '@services/date.service';
import { UsersService } from '@userModule/services/users.service';
import { User } from '@userModule/types';
import { catchError, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalsService {
  private coreUrl = `${environment.basicUrl}personals/`;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private userService: UsersService,
    private dateService: DateService,
    private translateService: TranslateService
  ) {}

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

  update(personal: UpdatePersonal, id: string): Observable<Personal> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }

    return this.http
      .post<Personal>(this.coreUrl + 'update/' + id, personal)
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

  getByCoachAndDate(date: string): Observable<Personal[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Personal[]>(
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

  addType = (personal: Personal): CoachClass => {
    return {
      ...personal,
      type: EClassTypes.personal,
      clients: [personal.client_id],
    };
  };
}
