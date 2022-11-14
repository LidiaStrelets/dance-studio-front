import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, take } from 'rxjs';
import { environment } from '@root/environments/environment';
import { Price } from '@pricesModule/types';
import { AuthService } from '@authModule/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  private coreUrl = `${environment.basicUrl}prices/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get(): Observable<Price[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<Price[]>(this.coreUrl).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
