import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User, UserChanges } from 'src/types';

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

  patch(id: string, updatedUser: UserChanges) {
    const { email, firstname, lastname, birth_date, photo, information } =
      updatedUser;
    return this.http
      .patch<User>(this.coreUrl + id, {
        email,
        firstname,
        lastname,
        birth_date,
        information,
        photo,
      })
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
}
