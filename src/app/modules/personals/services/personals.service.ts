import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatDatePipe } from '@pipes/format-date.pipe';
import { AuthService } from '@authModule/services/auth.service';
import { ClassItem } from '@classesModule/types/types';
import { CoachClass, EClassTypes } from '@coachClassesModule/types/types';
import { TranslateService } from '@ngx-translate/core';
import {
  CreatePersonal,
  Personal,
  UpdatePersonal,
} from '@personalsModule/types/types';
import { environment } from '@root/environments/environment';
import { UsersService } from '@userModule/services/users.service';
import { User } from '@userModule/types/types';
import { catchError, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalsService {
  private coreUrl = `${environment.basicUrl}personals/`;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private userService: UsersService,
    private translateService: TranslateService,
    private formatDate: FormatDatePipe
  ) {}

  public create(personal: CreatePersonal): Observable<Personal> | null {
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
        take(1)
      );
  }

  public update(
    personal: UpdatePersonal,
    id: string
  ): Observable<Personal> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }

    return this.http
      .post<Personal>(this.coreUrl + 'update/' + id, personal)
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      );
  }

  public get(id: string): Observable<Personal[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<Personal[]>(this.coreUrl + 'byId/' + id).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  public getByUser(): Observable<Personal[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Personal[]>(this.coreUrl + this.authService.getCurrentUserId())
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      );
  }

  public getByCoachAndDate(date: string): Observable<Personal[]> | null {
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
        take(1)
      );
  }

  public createConfirmData(
    personal: CreatePersonal,
    coaches: User[],
    classes: ClassItem[]
  ): string {
    const coach = coaches.find(({ id }) => id === personal.coach_id);
    const classItem = classes.find(({ id }) => id === personal.class_id);

    const translation = this.translateService.instant(
      'alert.confirmationPersonal',
      {
        date: this.formatDate.transform(personal.date_time, 'date-time'),
        coach: this.userService.getUserName(coach!),
        class: classItem?.name,
        duration: personal.duration,
      }
    );

    return translation;
  }

  public addType(personal: Personal): CoachClass {
    return {
      ...personal,
      type: EClassTypes.personal,
      clients: [personal.client_id],
    };
  }
}
