import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, TokenResponce } from '@authModule/types/types';
import { catchError, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@root/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BeService {
  private url = `${environment.basicUrl}auth/login`;

  constructor(private http: HttpClient) {}

  public register(data: LoginData): Observable<TokenResponce> {
    return this.http.post<TokenResponce>(this.url, data).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
