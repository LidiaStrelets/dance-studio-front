import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Hall } from 'src/types';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  url = `${environment.basicUrl}halls`;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  get(): Observable<Hall[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.httpClient.get<Hall[]>(this.url).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}
