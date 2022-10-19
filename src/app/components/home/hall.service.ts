import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Hall } from 'src/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  url = `${environment.basicUrl}halls`;
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Hall[]> {
    return this.httpClient.get<Hall[]>(this.url).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
