import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationData, TokenResponce } from 'src/types';
import { catchError, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BeService {
  private url = `${environment.basicUrl}auth/registration`;

  constructor(private http: HttpClient) {}

  register(data: RegistrationData): Observable<TokenResponce> {
    return this.http.post<TokenResponce>(this.url, data).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
