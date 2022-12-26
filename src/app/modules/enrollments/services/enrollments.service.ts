import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '@root/environments/environment';
import {
  ByCoachSchedule,
  Registration,
  Stats,
} from '@enrollmentsModule/types/types';
import { AuthService } from '@authModule/services/auth.service';
import { TrainingFull } from '@schedulesModule/types/types';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private coreUrl = `${environment.basicUrl}registrations/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public enroll(schedule_id: string): Observable<Registration> | null {
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

  public cancell(enrollment_id: string): Observable<Registration[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .delete<Registration[]>(this.coreUrl + enrollment_id)
      .pipe(take(1));
  }

  public getStats(): Observable<Stats> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Stats>(this.coreUrl + 'stats/' + this.authService.getCurrentUserId())
      .pipe(take(1));
  }

  public getBySchedule(id: string): Observable<Registration[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Registration[]>(this.coreUrl + 'bySchedule/' + id)
      .pipe(take(1));
  }

  public getByDateMapped(date: string): Observable<TrainingFull[]> | null {
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
      .pipe(take(1));
  }

  public getByDateAndCoachMapped(
    date: string
  ): Observable<ByCoachSchedule[]> | null {
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
      .pipe(take(1));
  }

  public getByDate(date: string): Observable<Registration[]> | null {
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
