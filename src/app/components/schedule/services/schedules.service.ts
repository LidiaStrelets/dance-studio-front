import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ScheduleFull } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private coreUrl = `${environment.basicUrl}schedules/`;

  constructor(private http: HttpClient) {}

  get(): Observable<ScheduleFull[]> {
    return this.http.get<ScheduleFull[]>(this.coreUrl).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
