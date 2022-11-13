import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Registration, ScheduleFull, Stats } from 'src/types';
import { AuthService } from '../../auth/services/auth.service';

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

  getByDateMapped(date: string): Observable<ScheduleFull[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<ScheduleFull[]>(
        this.coreUrl +
          'byDateMapped/' +
          this.authService.getCurrentUserId() +
          '/' +
          date
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
          date
      )
      .pipe(take(1));
  }
}
