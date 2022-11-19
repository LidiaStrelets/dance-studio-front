import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { User, UserRequest } from './../types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userId = '';
  private coreUrl = `${environment.basicUrl}users/`;
  private coaches: User[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getCurrentUserId() ?? '';
  }

  getById(id?: string): Observable<User> | null {
    if (!this.authService.getCurrentUserId() && !id) {
      return null;
    }
    const requestId = id || this.userId;
    return this.http.get<User>(this.coreUrl + requestId).pipe(
      catchError((err) => {
        throw err;
      }),
      take(1),
      map((data) => {
        if (data.birth_date) {
          data.birth_date = new Date(data.birth_date);
        }
        return data;
      })
    );
  }

  patch(id: string, updatedUser: UserRequest) {
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
      take(1),
      map((data) => {
        if (data.user.birth_date) {
          data.user.birth_date = new Date(data.user.birth_date);
        }

        return data;
      })
    );
  }

  getCoaches = async (): Promise<Observable<User[]> | null> => {
    await setTimeout(() => {}, 1000);
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

  setCoaches = (coaches: User[]) => (this.coaches = coaches);
  getCurrentCoaches = () => this.coaches;

  getUserName = ({ firstname, lastname }: User) => `${firstname} ${lastname}`;
}
