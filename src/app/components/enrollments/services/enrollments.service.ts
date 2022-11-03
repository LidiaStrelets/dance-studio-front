import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Registration } from 'src/types';
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

  getEnrollments(): Observable<Registration[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Registration[]>(this.coreUrl + this.authService.getCurrentUserId())
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
}
