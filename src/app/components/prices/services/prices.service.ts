import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Price } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  private coreUrl = `${environment.basicUrl}prices/`;

  constructor(private http: HttpClient) {}

  get(): Observable<Price[]> {
    return this.http.get<Price[]>(this.coreUrl).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
