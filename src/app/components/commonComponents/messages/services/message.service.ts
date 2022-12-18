import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@authModule/services/auth.service';
import { environment } from '@root/environments/environment';
import { catchError, Observable, take } from 'rxjs';
import { PersonalMessage } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private coreUrl = `${environment.basicUrl}personals/messages/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get(id: string): Observable<PersonalMessage[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<PersonalMessage[]>(this.coreUrl + id).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }
}