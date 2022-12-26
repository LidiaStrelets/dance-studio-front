import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Hall } from '@homeModule/types/types';
import { environment } from '@root/environments/environment';
import { AuthService } from '@authModule/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  private url = `${environment.basicUrl}halls`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public get(): Observable<Hall[]> | null {
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
