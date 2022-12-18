import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { DateService } from '@services/date.service';
import { environment } from '@root/environments/environment';
import {
  TrainingFull,
  TrainingUpdate,
  TrainingWithInfoFull,
} from '@schedulesModule/types';
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

  create() {
    return this.http.post(this.coreUrl + 'createSchedules', {}).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  get(date: string): Observable<TrainingFull[]> | null {
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

  getSalary(): Observable<number> | null {
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

  getById(id: string): Observable<TrainingWithInfoFull> | null {
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

  getWeek(): Observable<TrainingFull[]> | null {
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

  getEnrolled(date: string): Observable<TrainingFull[]> | null {
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

  update(id: string, update: TrainingUpdate): Observable<TrainingFull> | null {
    if (!this.authService.getCurrentUserId() || !id) {
      return null;
    }
    return this.http.patch<TrainingFull>(this.coreUrl + id, update).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
