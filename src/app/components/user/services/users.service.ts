import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { User, UserForm } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userId = '';
  private coreUrl = `${environment.basicUrl}users/`;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getCurrentUserId();
  }

  getById(): Observable<User> {
    if (!this.userId) {
      this.authService.getUserIdFromToken()?.subscribe({
        next: (res) => (this.userId = res.data.id),
      });
    }

    return this.http.get<User>(this.coreUrl + this.userId).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  patch(id: string, updatedUser: UserForm) {
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
      })
    );
  }
}