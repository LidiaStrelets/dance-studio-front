import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { environment } from '@root/environments/environment';
import { User, UserRequest } from '@userModule/types/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userId = '';
  private coreUrl = `${environment.basicUrl}users/`;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getCurrentUserId() ?? '';
  }

  public getById(id?: string): Observable<User> | null {
    if (!this.authService.getCurrentUserId() && !id) {
      return null;
    }
    const requestId = id || this.userId;
    return this.http.get<User>(this.coreUrl + requestId).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  public patch(id: string, updatedUser: UserRequest) {
    if (!this.authService.getCurrentUserId()) {
      return;
    }
    const formData = new FormData();
    const values = updatedUser;

    if (values.photo) {
      formData.append('thumbnail', values.photo);
    }
    formData.append(
      'userForm',
      JSON.stringify({
        ...updatedUser,
      })
    );

    return this.http.patch<{ user: User }>(this.coreUrl + id, formData).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  public getCoaches(): Observable<User[]> | null {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<User[]>(this.coreUrl + 'coaches').pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  public getUserName({ firstname, lastname }: User) {
    return `${firstname} ${lastname}`;
  }
}
