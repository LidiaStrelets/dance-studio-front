import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { User, UserForm } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userId = '';
  private coreUrl = `${environment.basicUrl}users/`;
  private users: User[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getCurrentUserId();
    this.get();
  }

  getById(id?: string): Observable<User> | null {
    if (!this.authService.getCurrentUserId()) {
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

  get() {
    if (!this.authService.getCurrentUserId()) {
      return;
    }
    this.http
      .get<User[]>(this.coreUrl)
      .pipe(
        catchError((err) => {
          throw err;
        }),
        take(1)
      )
      .subscribe({ next: (res) => (this.users = res) });
  }

  patch(id: string, updatedUser: UserForm) {
    if (!this.authService.getCurrentUserId()) {
      return;
    }
    const formData = new FormData();
    const values = updatedUser.value;

    if (values.photo) {
      formData.append('thumbnail', values.photo);
    }
    formData.append(
      'userForm',
      JSON.stringify({
        firstname: values.firstname,
        lastname: values.lastname,
        information: values.information,
        birth_date: values.birth_date,
        photo: null,
      })
    );

    return this.http.patch<{ user: User }>(this.coreUrl + id, formData).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  }

  getCoaches = (): Observable<User[]> | null => {
    if (!this.authService.getCurrentUserId()) {
      return null;
    }
    return this.http.get<User[]>(this.coreUrl + 'coaches').pipe(
      catchError((err) => {
        throw err;
      }),
      take(1)
    );
  };

  getUsers = () => this.users;
}
