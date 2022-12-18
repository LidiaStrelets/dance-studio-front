import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, take } from 'rxjs';
import { LanguageService } from '@services/language.service';
import { environment } from '@root/environments/environment';
import { Payment, SubscriptionOptions } from '@paymentsModule/types';
import { AuthService } from '@authModule/services/auth.service';
import { Price } from '@pricesModule/types';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private coreUrl = `${environment.basicUrl}payments/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get(): Observable<Payment[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .get<Payment[]>(this.coreUrl + this.authService.getCurrentUserId())
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      );
  }

  create(price_id: string): Observable<Payment> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http
      .post<Payment>(this.coreUrl, {
        user_id: this.authService.getCurrentUserId(),
        price_id,
      })
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      );
  }
}
