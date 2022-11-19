import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { DateService } from '@services/date.service';
import { environment } from '@root/environments/environment';
import { ScheduleFull, SingleScheduleFull } from '@schedulesModule/types';
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

  get(date: string): Observable<ScheduleFull[]> | null {
    if (!this.authService.getCurrentUserId() || !date) {
      return null;
    }
    return this.http
      .get<ScheduleFull[]>(this.coreUrl + date.split('T')[0])
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1),
        map((data) => {
          data.forEach((item) => {
            if (item.date_time) {
              item.date_time = new Date(item.date_time);
            }
          });

          return data;
        })
      );
  }

  getById(id: string): Observable<SingleScheduleFull> | null {
    if (!this.authService.getCurrentUserId() || !id) {
      return null;
    }
    return this.http
      .get<SingleScheduleFull>(this.coreUrl + 'schedule/' + id)
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

  getWeek(): Observable<ScheduleFull[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<ScheduleFull[]>(
        this.coreUrl +
          'week/' +
          this.dateService.templateWeekStart.toISOString() +
          '/' +
          this.dateService.templateWeekEnd.toISOString()
      )
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1),
        map((data) => {
          data.forEach((item) => {
            if (item.date_time) {
              item.date_time = new Date(item.date_time);
            }
          });

          return data;
        })
      );
  }

  getEnrolled(date: string): Observable<ScheduleFull[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<ScheduleFull[]>(
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
        take(1),
        map((data) => {
          data.forEach((item) => {
            if (item.date_time) {
              item.date_time = new Date(item.date_time);
            }
          });

          return data;
        })
      );
  }
}
