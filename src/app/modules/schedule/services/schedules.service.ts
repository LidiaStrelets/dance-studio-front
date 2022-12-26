import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { DateService } from '@services/date.service';
import { environment } from '@root/environments/environment';
import {
  TrainingFull,
  TrainingWithInfoFull,
} from '@schedulesModule/types/types';
import { AuthService } from '@authModule/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private coreUrl = `${environment.basicUrl}schedules/`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private dateService: DateService
  ) {}

  public create() {
    return this.http.post(this.coreUrl + 'createSchedules', {}).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  public get(date: string): Observable<TrainingFull[]> | null {
    if (!this.authService.getCurrentUserId() || !date) {
      return null;
    }
    return this.http
      .get<TrainingFull[]>(this.coreUrl + date.split('T')[0])
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      );
  }

  public getSalary(): Observable<number> | null {
    if (!this.authService.getCurrentUserId() || !this.authService.isCoach) {
      return null;
    }
    return this.http
      .get<number>(
        this.coreUrl + 'salary/' + this.authService.getCurrentUserId()
      )
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      );
  }

  public getById(id: string): Observable<TrainingWithInfoFull> | null {
    if (!this.authService.getCurrentUserId() || !id) {
      return null;
    }
    return this.http
      .get<TrainingWithInfoFull>(this.coreUrl + 'schedule/' + id)
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      );
  }

  public getWeek(): Observable<TrainingFull[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<TrainingFull[]>(
        this.coreUrl +
          'week/' +
          this.dateService.templateWeekStart +
          '/' +
          this.dateService.templateWeekEnd
      )
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      );
  }

  public getEnrolled(date: string): Observable<TrainingFull[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<TrainingFull[]>(
        this.coreUrl +
          'enrolled/' +
          this.authService.getCurrentUserId() +
          '/' +
          date
      )
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      );
  }
}
