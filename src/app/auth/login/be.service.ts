import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, TokenResponce } from 'src/types';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeService {
  private url = 'http://localhost:5555/auth/login';

  constructor(private http: HttpClient) {}

  register(data: LoginData): Observable<TokenResponce> {
    return this.http.post<TokenResponce>(this.url, data).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
