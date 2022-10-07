import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Hall } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  url = 'http://localhost:5555/halls';
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Hall[]> {
    return this.httpClient.get<Hall[]>(this.url).pipe(
      catchError((err) => {
        console.log('catch hall service', err);

        throw err;
      })
    );
  }
}
