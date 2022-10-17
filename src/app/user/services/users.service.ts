import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User, UserForm } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private coreUrl = 'http://localhost:5555/users/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getById(): Observable<User> {
    const userId = this.authService.getCurrentUserId();

    return this.http.get<User>(this.coreUrl + userId).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  patch(id: string, updatedUser: UserForm) {
    const values = updatedUser.value;

    if (values.photo) {
      const req = this.sendPhoto(values.photo, id);
      if (!updatedUser.dirty) {
        return req;
      }
      req.subscribe({
        next: (res) => console.log('result', res),
        error: (err) => {
          throw err;
        },
      });
    }

    return this.http
      .patch<User>(this.coreUrl + id, {
        firstname: values.firstname,
        lastname: values.lastname,
        information: values.information,
        birth_date: values.birth_date,
      })
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }

  sendPhoto = (file: File, id: string) => {
    const formData = new FormData();

    formData.append('thumbnail', file);

    return this.http.post<any>(this.coreUrl + id + '/photo', formData).pipe(
      catchError((err) => {
        throw err;
      })
    );
  };
}