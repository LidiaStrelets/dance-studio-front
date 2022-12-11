import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ByCoachSchedule, Registration, Stats } from '@enrollmentsModule/types';
import { AuthService } from '@authModule/services/auth.service';
import { TrainingFull } from '@schedulesModule/types';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private coreUrl = `${environment.basicUrl}registrations/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  enroll(schedule_id: string): Observable<Registration> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }

    return this.http
      .post<Registration>(this.coreUrl, {
        schedule_id,
        client_id: this.authService.getCurrentUserId(),
      })
      .pipe(take(1));
  }

  cancell(enrollment_id: string): Observable<Registration[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .delete<Registration[]>(this.coreUrl + enrollment_id)
      .pipe(take(1));
  }

  getStats(): Observable<Stats> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Stats>(this.coreUrl + 'stats/' + this.authService.getCurrentUserId())
      .pipe(take(1));
  }

  getBySchedule(id: string): Observable<Registration[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Registration[]>(this.coreUrl + 'bySchedule/' + id)
      .pipe(take(1));
  }

  getByDateMapped(date: string): Observable<TrainingFull[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<TrainingFull[]>(
        this.coreUrl +
          'byDateMapped/' +
          this.authService.getCurrentUserId() +
          '/' +
          date.split('T')[0]
      )
      .pipe(
        take(1),
        map((data) => {
          data.forEach((item) => {
            item.date_time = new Date(item.date_time);
          });

          return data;
        })
      );
  }

  getByDateAndCoachMapped(date: string): Observable<ByCoachSchedule[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<ByCoachSchedule[]>(
        this.coreUrl +
          'byDateAndCoachMapped/' +
          this.authService.getCurrentUserId() +
          '/' +
          date.split('T')[0]
      )
      .pipe(
        take(1),
        map((data) => {
          data.forEach((item) => {
            item.date_time = new Date(item.date_time);
          });

          return data;
        })
      );
  }

  getByDate(date: string): Observable<Registration[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Registration[]>(
        this.coreUrl +
          'byDate/' +
          this.authService.getCurrentUserId() +
          '/' +
          date.split('T')[0]
      )
      .pipe(take(1));
  }
}
