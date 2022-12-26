import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { environment } from '@root/environments/environment';
import { catchError, Observable, take } from 'rxjs';
import { PersonalMessage } from '@app/common/types/types';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private coreUrl = `${environment.basicUrl}messages/`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public get(id: string): Observable<PersonalMessage[]> | null {
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
