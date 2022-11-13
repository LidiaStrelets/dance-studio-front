import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, take } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';
import { Payment, Price, SubscriptionOptions } from 'src/types';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private coreUrl = `${environment.basicUrl}payments/`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private languageService: LanguageService
  ) {}

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
        take(1),
        map((data) => {
          data.forEach((item) => {
            if (item.createdAt) {
              item.createdAt = new Date(item.createdAt);
            }
          });

          return data;
        })
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
        take(1),
        map((data) => {
          if (data.createdAt) {
            data.createdAt = new Date(data.createdAt);
          }

          return data;
        })
      );
  }

  translateClassesAmount = (price: Price) => {
    if (this.languageService.isUk()) {
      let option: SubscriptionOptions;
      switch (price.classes_amount) {
        case 1000:
          option = {
            option: `Безлімітний`,
            value: 1000,
            price: price.price,
          };
          break;
        case 1:
          option = {
            option: `${price.classes_amount} заняття`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        case 2:
          option = {
            option: `${price.classes_amount} заняття`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        case 4:
          option = {
            option: `${price.classes_amount} заняття`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        case 8:
          option = {
            option: `${price.classes_amount} занять`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        case 16:
          option = {
            option: `${price.classes_amount} занять`,
            value: price.classes_amount,
            price: price.price,
          };
          break;
        default:
          option = {} as SubscriptionOptions;
      }
      return option;
    } else {
      return price.classes_amount === 1000
        ? { option: `Unlimited`, value: 1000, price: price.price }
        : {
            option: `${price.classes_amount} classes`,
            value: price.classes_amount,
            price: price.price,
          };
    }
  };
}
