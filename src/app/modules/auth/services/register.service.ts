import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@root/environments/environment';
import { RegistrationData, TokenResponce } from '@authModule/types/types';

@Injectable({
  providedIn: 'root',
})
export class BeService {
  private url = `${environment.basicUrl}auth/registration`;

  constructor(private http: HttpClient) {}

  public register(data: RegistrationData): Observable<TokenResponce> {
    return this.http.post<TokenResponce>(this.url, data).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
