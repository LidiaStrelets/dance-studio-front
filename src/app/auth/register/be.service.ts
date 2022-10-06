import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationData } from 'src/types';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BeService {
  private url = 'http://localhost:5555/auth/registration';

  constructor(private http: HttpClient) {}

  register(data: RegistrationData) {
    return this.http.post(this.url, data).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
