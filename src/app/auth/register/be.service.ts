import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationData, TokenResponce } from 'src/types';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeService {
  private url = 'http://localhost:5555/auth/registration';

  constructor(private http: HttpClient) {}

  register(data: RegistrationData): Observable<TokenResponce> {
    return this.http.post<TokenResponce>(this.url, data).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
